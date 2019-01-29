#!/bin/sh

[[ "$1" == "err11" ]] && exit 11
[[ -n "$1" ]] && echo $1

touch $0.did
grep 'c'
