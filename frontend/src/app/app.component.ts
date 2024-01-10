import { Component } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface TranslatedData {
    translated_text: string,
    synonyms: string[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private http: HttpClient){}
    languages = [
        {name: 'Arabic', value: 'ar'},
        {name: 'Chinese', value: 'zh'},
        {name: 'English', value: 'en'},
        {name: 'French', value: 'fr'},
        {name: 'German', value: 'de'},
        {name: 'Greek', value: 'el'},
        {name: 'Hebrew', value: 'he'},
        {name: 'Italian', value: 'it'},
        {name: 'Portuguese', value: 'pt'},
        {name: 'Spanish', value: 'es'},
        {name: 'Russian', value: 'ru'},
        ];

    public inputLanguage: string = '';
    public outputLanguage: string = '';
    public inputText: string = '';
    public translatedText: string = '';
    public synonyms: string[] = []
    public swapTooltip: string = 'Swaps source language with target language and replaces input text with output text'

    translate() {
        // Make HTTP request to python backend for translated text
        const params = new HttpParams(
            {fromString : `sourceLanguage=${this.inputLanguage}&targetLanguage=${this.outputLanguage}&inputText=${this.inputText}`})
        const headers = new HttpHeaders({"Access-Control-Allow-Origin": '*'})
        this.http.get<TranslatedData>('http://127.0.0.1:5000/translate',{headers: headers, params:params}).subscribe(data => {
            this.translatedText = data.translated_text;
            this.synonyms = data.synonyms;
        })
    }

    swapTranslation() {
        this.inputText = this.translatedText;
        this.translatedText = ""
        let tempLanguage = this.inputLanguage;
        this.inputLanguage = this.outputLanguage;
        this.outputLanguage = tempLanguage;
    }
}
