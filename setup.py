from setuptools import setup, find_packages

setup(
    name='server',
    version='0.1.0',
    description='Chat/Messaging App',
    author='Adeyemi_Arimoro',
    author_email='arimoro@gmail.com',
    classifiers=[
        'License :: OSI Approved :: BSD License',
        'Intended Audience :: Developers',
        'Intended Audience :: Science/Research',
        'Natural Language :: English',
        'Programming Language :: Python :: 3',
    ],
    python_requires='>=3',
    packages=find_packages(),
    include_package_data=True,
)
