#!python
import os

#SDL2_INCLUDE_PATH = '' #'C:\\SDL2-2.0.5\\include'
#SDL2_LIB_PATH = ''

projectname = 'sdl2_scene'				#holds the project name
projectpackage = 'main'						#holds the project folder
SRC_PATH = 'src'
builddir = SRC_PATH                         #holds the build directory for this project

build_base_dir = 'build'

CURRENT_DIR = os.getcwd()

VS_TOOL_BAT = 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\Community\\VC\\Auxiliary\\Build\\vcvars32.bat' #window

include_packages = []

core_packages = []

lib_packages = []