import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "onlyFirstName"})
export class OnlyFirstName implements PipeTransform {
    transform(userName: string) {
        if(userName?.length) {
            return userName.split(' ')[0];
        } else {
            return "";
        }
    }
}