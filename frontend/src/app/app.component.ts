import { Component } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface TranslatedData {
    translated_text: string
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

    translate() {
        // Make HTTP request to python backend for translated text
        const params = new HttpParams(
            {fromString : `inputLanguage=${this.inputLanguage}&outputLanguage=${this.outputLanguage}&inputText=${this.inputText}`})
        const headers = new HttpHeaders({"Access-Control-Allow-Origin": '*'})
        this.http.get<TranslatedData>('http://localhost:5000/translate',{headers: headers, params:params}).subscribe(data => {
            this.translatedText = data.translated_text;
        })
    }

    
}
