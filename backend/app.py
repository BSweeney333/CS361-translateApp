from flask import Flask, request, render_template
from flask_cors import CORS
import requests
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
        data = {}
        # Get inputed data
        inputText = request.args.get('inputText')
        sourceLanguage = request.args.get('sourceLanguage')
        targetLanguage = request.args.get('targetLanguage')
        # Get translated text
        translatedText = argostranslate.translate.translate(inputText, sourceLanguage, targetLanguage)

        # Get English translation to make synonyms call
        englishText = argostranslate.translate.translate(inputText, sourceLanguage, "en")

        # Get synonyms
        synonyms = getsynonyms(englishText)
        translatedSynonyms = []
        for synonym in synonyms:
            translatedSynonym = argostranslate.translate.translate(synonym, sourceLanguage, targetLanguage)
            translatedSynonyms.append(translatedSynonym)
        return {"translated_text": translatedText, "synonyms": translatedSynonyms}
    

    def getsynonyms(text):
        URL = "http://wordser:8080/api/v1/synonyms"
        PARAMS = {'word': text}

        # Split the text by spaces, if longer than 1, will return empty synonyms
        words = text.split(' ')
        synonyms = []
        if words == 1:
            response = requests.get(url= URL, params= PARAMS)
            data = response.json()
            synonyms = data["synonyms"]
        return synonyms
        # return ["passion", "fire", "desire"]

    return app

