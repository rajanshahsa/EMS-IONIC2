import { Http, Headers } from '@angular/http';

export class Webservice {
    
    static requestForPost(body: any, url : String, http: Http) {
        return new Promise((resolve, reject) => {
            var url = url;
            var headers = new Headers();
            // headers.append('Content-Type', 'application/json');
            http.post(url, body, {
                headers: headers
            }).map(res => res.json()).subscribe(data => {
                data = data;
                resolve(data);
            }, error => reject(error), () => console.log("Finished"));
        });
    }

}