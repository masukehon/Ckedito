import { Injectable } from '@angular/core';
import { initCkeditor } from '../../assets/javascript/initCkeditor';
import { getValueCkeditor } from '../../assets/javascript/getValueCkeditor';
import { setValueCkeditor } from '../../assets/javascript/setValueCkeditor';

@Injectable()

export class CkeditorService {

    constructor() { }

    init() {
        return initCkeditor();
    }

    getValue(cb) {
        return getValueCkeditor(cb);
    }

    setValue(data) {
        return setValueCkeditor(data);
    }
}


