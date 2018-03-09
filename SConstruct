#!python 
# this script help compile builds
import platform
import os
import sys
import glob

from build_config import * #build configs
from build_support import * #build helper

print("Project Script Config!")
print("Current Dir: " + os.getcwd())
CURRENT_DIR = os.getcwd()

#get the mode flag from the command line
#default to 'release' if the user didn't specify
projectmode = ARGUMENTS.get('mode', 'release')   #holds current mode
osplatform = sys.platform

target_os = str(Platform())

buildroot = './bin/' + projectmode			#holds the root of the build directory tree
targetpath = buildroot + '/' + projectname	#holds the path to the executable in the build directory

emscripten = ARGUMENTS.get('emscripten', 1)

if emscripten: target_os = 'js'

if osplatform == 'win32': #window tool default to vs2017
    env = Environment(ENV = os.environ, MSVC_USE_SCRIPT=VS_TOOL_BAT)
else:
    env = Environment(ENV = os.environ) #this load user complete external environment

#Export('env','SRC_PATH','buildroot','include_packages','core_packages','CURRENT_DIR','SDL2_LIB_PATH','SDL2_INCLUDE_PATH','buildroot','targetpath','builddir','lib_packages')

Export('env','SRC_PATH','buildroot','include_packages','core_packages','CURRENT_DIR','buildroot','targetpath','builddir','lib_packages')

# build path checks
#target_dir = '#' + SelectBuildDir(build_base_dir)
#SConscript(target_dir + os.sep + 'SConscript')

env.Append(CFLAGS= '-Wall -std=gnu99 -Wno-unknown-pragmas '
                   '-Wno-unknown-warning-option',
           CXXFLAGS='-std=gnu++11 -Wall -Wno-narrowing '
                    '-Wno-unknown-pragmas -Wno-unused-function'
        )


sources =  glob.glob('src/*.c')

#print(os.environ['EMSCRIPTEN'])

env.Append(CPPPATH=['src'])

if target_os == 'js':
    print("javascript")
    #assert(os.environ['EMSCRIPTEN_TOOL_PATH'])
    env.Tool('emscripten', toolpath=[os.environ['EMSCRIPTEN']])

    funcs = ['_main']
    funcs = ','.join("'{}'".format(x) for x in funcs)
    flags = [
             '-s', 'ALLOW_MEMORY_GROWTH=1',
             '-s', 'USE_GLFW=3',
             '-Os',
             '-s', 'NO_EXIT_RUNTIME=1',
             '-s', '"EXPORTED_FUNCTIONS=[{}]"'.format(funcs),
            ]

    env.Append(CCFLAGS=['-DGLES2 1', '-DNO_ZLIB', '-DNO_ARGP'] + flags)
    env.Append(LINKFLAGS=flags)
    env.Append(LIBS=['GL'])

print(target_os)
# Append external environment flags
env.Append(
    CFLAGS=os.environ.get("CFLAGS", "").split(),
    CXXFLAGS=os.environ.get("CXXFLAGS", "").split(),
    LINKFLAGS=os.environ.get("LDFLAGS", "").split()
)

env.Program(target='script', source=sources)

print("script end")






"""
javascript_files = [
"hello_world.c"
]

env_javascript = env.Clone()

javascript_objects = []
for x in javascript_files:
    javascript_objects.append(env_javascript.Object(x))

env.Append(LINKFLAGS=["-s", "EXPORTED_FUNCTIONS=\"['_main','_main_after_fs_sync','_send_notification']\""])

target_dir = env.Dir("#bin")
build = env.Program(['#bin/godot', target_dir.File('godot' + env['PROGSUFFIX'] + '.wasm')], javascript_objects, PROGSUFFIX=env['PROGSUFFIX'] + '.js')
js, wasm = build

js_libraries = []
#js_libraries.append(env.File('http_request.js'))
for lib in js_libraries:
    env.Append(LINKFLAGS=['--js-library', lib.path])
env.Depends(build, js_libraries)

wrapper_start = env.File('pre.js')
wrapper_end = env.File('engine.js')
#js_final = env.Textfile('#bin/godot', [wrapper_start, js, wrapper_end], TEXTFILESUFFIX=env['PROGSUFFIX'] + '.wrapped.js')

#zip_dir = target_dir.Dir('.javascript_zip')
#zip_files = env.InstallAs([zip_dir.File('godot.js'), zip_dir.File('godot.wasm'), zip_dir.File('godot.html')], [js_final, wasm, '#misc/dist/html/default.html'])
#Zip('#bin/godot', zip_files, ZIPSUFFIX=env['PROGSUFFIX'] + env['ZIPSUFFIX'], ZIPROOT=zip_dir, ZIPCOMSTR="Archving $SOURCES as $TARGET")
"""