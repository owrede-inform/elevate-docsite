# PowerShell script to kill development servers while preserving Claude Code process

Write-Host "Killing development servers..." -ForegroundColor Yellow

# Get all node.exe processes
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue

if ($nodeProcesses) {
    Write-Host "Found $($nodeProcesses.Count) Node.js process(es)" -ForegroundColor Cyan
    
    foreach ($process in $nodeProcesses) {
        # Get command line to identify the process
        $commandLine = ""
        try {
            $commandLine = (Get-WmiObject Win32_Process -Filter "ProcessId = $($process.Id)").CommandLine
        }
        catch {
            # If we can't get command line, we'll be cautious
            $commandLine = ""
        }
        
        # Exclude Claude Code processes and system processes
        $shouldKill = $true
        
        if ($commandLine) {
            # Don't kill Claude Code processes
            if ($commandLine -match "claude-code|Claude Code|@anthropics") {
                $shouldKill = $false
                Write-Host "  Preserving Claude Code process (PID: $($process.Id))" -ForegroundColor Green
            }
            # Don't kill system Node processes
            elseif ($commandLine -match "Windows|System32|Program Files") {
                $shouldKill = $false
                Write-Host "  Preserving system process (PID: $($process.Id))" -ForegroundColor Green
            }
            # Identify likely dev servers
            elseif ($commandLine -match "vite|webpack|next|react-scripts|nodemon|ts-node|serve|http-server|live-server|dev|start") {
                $shortCommand = $commandLine.Substring(0, [Math]::Min(60, $commandLine.Length))
                Write-Host "  Killing dev server: $shortCommand..." -ForegroundColor Red
            }
            else {
                $shortCommand = $commandLine.Substring(0, [Math]::Min(40, $commandLine.Length))
                Write-Host "  Killing Node process (PID: $($process.Id)): $shortCommand..." -ForegroundColor Red
            }
        }
        else {
            Write-Host "  Killing Node process (PID: $($process.Id)) - command line unknown" -ForegroundColor Red
        }
        
        if ($shouldKill) {
            try {
                Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
                Write-Host "    Successfully killed process $($process.Id)" -ForegroundColor Green
            }
            catch {
                Write-Host "    Failed to kill process $($process.Id)" -ForegroundColor Red
            }
        }
    }
}
else {
    Write-Host "No Node.js processes found running" -ForegroundColor Green
}

Write-Host "Development server cleanup completed" -ForegroundColor Green