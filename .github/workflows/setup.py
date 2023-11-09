from setuptools import setup

setup(
    name='server',
    version='0.1.0',
    description='Chat/Messaging App',
    author='Adeyemi Arimoro',
    author_email='arimoro71@gmail.com',
    url='http://physics.codes',
    classifiers=[
        'License :: OSI Approved :: BSD License',
        'Intended Audience :: Developers',
        'Intended Audience :: Science/Research',
        'Natural Language :: English',
        'Programming Language :: Python :: 3',
    ],
    python_requires='>=3',
    zip_safe=False,
    packages=find_packages(),
    # find automatically:
    # packages=find_packages(),
    package_dir={
        'server': 'server',
        'server.bin': 'server/bin',
        'server.lib': 'server/lib',
        'server.src': 'server/src',
        'server.instance': 'server/instance',
        'server.migrations': 'server/migrations',
        },
    #
    include_package_data=True,
    # or you can specify explicitly:
    # package_data={
    #     'server': ['assets/*.txt']
    #     },
    )