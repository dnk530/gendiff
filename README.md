### Hexlet tests and linter status:
[![Actions Status](https://github.com/dnk530/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/dnk530/frontend-project-lvl2/actions)
[![Actions Status](https://github.com/dnk530/frontend-project-lvl2/workflows/CI/badge.svg)](https://github.com/dnk530/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/6b1eb089510fee028b48/maintainability)](https://codeclimate.com/github/dnk530/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6b1eb089510fee028b48/test_coverage)](https://codeclimate.com/github/dnk530/frontend-project-lvl2/test_coverage)

Gendiff compares two configuration files (JSON or YAML) and shows a difference.

## Requirements

Node v16+

## Installation

```bash
make install
```

## Help

For help use `gendiff -h`. Demo:

[![asciicast](https://asciinema.org/a/GDmQCHPHZw8P0urDScowPIOn9.svg)](https://asciinema.org/a/GDmQCHPHZw8P0urDScowPIOn9)

## Usage

```bash
gendiff [options] <filepath1> <filepath2>
```
[![asciicast](https://asciinema.org/a/Gh6iieXdFWlQKizkXmSTeGgZg.svg)](https://asciinema.org/a/Gh6iieXdFWlQKizkXmSTeGgZg)

## Options demo
There are three formatting options for output  `-f [type]` or `--format [type]`: 
- `stylish` (default)

[![asciicast](https://asciinema.org/a/VywaVEWYXL61hg7a5VOCnTFje.svg)](https://asciinema.org/a/VywaVEWYXL61hg7a5VOCnTFje)

- `plain`

[![asciicast](https://asciinema.org/a/MGQKziRn4UK51h1kWxF9fwkov.svg)](https://asciinema.org/a/MGQKziRn4UK51h1kWxF9fwkov)

- `json`

[![asciicast](https://asciinema.org/a/k3ruLl7KJ32A4NVRrsBwidDTz.svg)](https://asciinema.org/a/k3ruLl7KJ32A4NVRrsBwidDTz)
