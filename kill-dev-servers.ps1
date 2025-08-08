# Kill development servers script - Safe version that excludes Claude Code
# This script kills node.exe processes but preserves Claude Code process

Write-Host "Killing development servers..." -ForegroundColor Yellow

# Get all node.exe processes
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue

if ($nodeProcesses) {
    foreach ($process in $nodeProcesses) {
        try {
            # Get the command line to identify the process
            $commandLine = (Get-WmiObject Win32_Process -Filter "ProcessId = $($process.Id)").CommandLine
            
            # Skip if this is Claude Code process (contains "claude" in path or command)
            if ($commandLine -and ($commandLine -match "claude" -or $commandLine -match "Claude")) {
                Write-Host "Skipping Claude Code process (PID: $($process.Id))" -ForegroundColor Green
                continue
            }
            
            # Skip if command line contains common Claude Code indicators
            if ($commandLine -and ($commandLine -match "anthropic" -or $commandLine -match "\.claude")) {
                Write-Host "Skipping Claude-related process (PID: $($process.Id))" -ForegroundColor Green
                continue
            }
            
            Write-Host "Killing node process PID: $($process.Id) - $commandLine" -ForegroundColor Red
            Stop-Process -Id $process.Id -Force
            Write-Host "Successfully killed PID: $($process.Id)" -ForegroundColor Green
        }
        catch {
            Write-Host "Could not kill process PID: $($process.Id) - $($_.Exception.Message)" -ForegroundColor Yellow
        }
    }
}
else {
    Write-Host "No node.exe processes found." -ForegroundColor Green
}

# Also kill any processes specifically on common dev ports
$devPorts = @(3000, 3001, 3002, 3003, 8080, 8081, 5173, 4200)

foreach ($port in $devPorts) {
    try {
        $connections = netstat -ano | Select-String ":$port "
        if ($connections) {
            foreach ($connection in $connections) {
                $parts = $connection.ToString().Split(' ', [System.StringSplitOptions]::RemoveEmptyEntries)
                if ($parts.Length -gt 4) {
                    $pid = $parts[-1]
                    if ($pid -match '^\d+$') {
                        $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
                        if ($process) {
                            $commandLine = (Get-WmiObject Win32_Process -Filter "ProcessId = $pid" -ErrorAction SilentlyContinue).CommandLine
                            
                            # Skip Claude Code processes
                            if ($commandLine -and ($commandLine -match "claude" -or $commandLine -match "Claude" -or $commandLine -match "anthropic" -or $commandLine -match "\.claude")) {
                                Write-Host "Skipping Claude-related process on port $port (PID: $pid)" -ForegroundColor Green
                                continue
                            }
                            
                            Write-Host "Killing process on port $port (PID: $pid)" -ForegroundColor Red
                            Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
                        }
                    }
                }
            }
        }
    }
    catch {
        # Ignore errors for ports that aren't in use
    }
}

Write-Host "Development server cleanup complete!" -ForegroundColor Green