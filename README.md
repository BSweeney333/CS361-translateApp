# CS361-translateApp
## Language Translation API

This API allows you to receive a translation of the text you send to it, depending on the target language that you provide to it. It is really easy to use. 

11 Languages are supported by this API: Arabic, Chinese, English, French, German, Greek, Hebrew, Italian, Portuguese, Spanish, and Russian.

In order to use this API you must send a GET request to ‘http://localhost:5000/translate’ and provide information for these three parameters: **inputText**, **sourceLanguage**, and **targetLanguage**.

The sourceLanguage and targetLanguage must follow this mapping:
{
	Arabic: ar,
	Chinese: zh,
	English: en,
	French: fr,
	German: de,
	Greek: el,
	Italian: it,
	Portuguese: pt,
	Spanish: es,
	Russian: ru,

}

So if you want the target language to be french, you would have to send the fr for the targetLanguage parameter.


### Example Request:
**Method** = GET<br>
**Params** = inputText, sourceLanguage, targetLanguage<br>
**URL** = http://localhost:5000/translate?inputText=Hello&sourceLanguage=en&targetLanguage=es<br>



The request returns a JSON object containing the key translated_text with the value of the translation: {“translated_text”: “Hola”}
![image](https://github.com/BSweeney333/CS361-translateApp/assets/91225918/b584f2e2-98e6-471a-80fa-e3b0a8a6f65a)
