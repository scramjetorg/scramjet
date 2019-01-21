@echo off
@if "%1" ( echo %1 )
@copy /y nul "%~f0".did >NUL
@findstr "c"