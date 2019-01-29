@ECHO OFF
@if {%1} == {err11} (exit /b 11)
@if not {%1} == {} (echo %1)
@copy /y nul "%~f0".did >NUL
@findstr "c"