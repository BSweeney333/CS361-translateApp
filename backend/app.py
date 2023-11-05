from flask import Flask, request, render_template
from flask_cors import CORS
import argostranslate.package
import argostranslate.translate

def create_app():
    app = Flask(__name__)
    CORS(app)
    languages = ['ar', 'zh', 'en', 'fr', 'de', 'el', 'he', 'it', 'pt', 'es', 'ru']

    argostranslate.package.update_package_index()
    available_packages = argostranslate.package.get_available_packages()

    packages_to_install = filter(
            lambda x: x.from_code in languages and x.to_code in languages, available_packages
        )
    for package in packages_to_install:
        argostranslate.package.install_from_path(package.download())

    @app.route('/')
    def home():
        return "Hello World"
    
    @app.route('/translate')
    def translate():
        inputText = request.args.get('inputText')
        inputLanguage = request.args.get('inputLanguage')
        outputLanguage = request.args.get('outputLanguage')
        translatedText = argostranslate.translate.translate(inputText, inputLanguage, outputLanguage)
        return {"translated_text": translatedText}

    return app

