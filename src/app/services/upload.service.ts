import { Injectable } from '@angular/core';
import { RequestService } from './request.service';


@Injectable()

export class UploadService {

    constructor(private request: RequestService) { }

    getAll() {
        return this.request.get('/upload/files');
        // .catch(error => console.log(error));
    }
    create(file: any) {
        return this.request.post('/upload', file);
        // .catch(error => console.log(error));
    }

    // update(_id: string, branchInput: any) {
    //     return this.request.put(`/branch/${_id}`, branchInput)
    //         .then();
    //         // .catch(error => console.log(error));
    // }

    // remove(_id: string) {
    //     return this.request.delete('/branch/' + _id)
    //         .then();
    //         // .catch(error => console.log(error));
    // }

}


