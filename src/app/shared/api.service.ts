import { Injectable } from '@angular/core';
import { I18nService, I18nPipe } from '../common/services/I18nService';

var lang = {
        defaultLang: 'en',
        lang: {
            "TRUE": {
                en: "True",
                pl: "prawda"
            },
            "FALSE": {
                en: "False",
                pl: "Fałsz"
            },
            "DUPA": {
                en: "ass",
                pl: "dupa"
            }
        }
    };

    

@Injectable()
export class ApiService {

  i18n:I18nService = new I18nService();
  constructor() {
    this.i18n.init(lang);
  }
  title = 'Planer';
}
