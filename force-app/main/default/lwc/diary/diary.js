import { LightningElement ,wire,api,track} from 'lwc';
import getDiary from '@salesforce/apex/DiaryController.getDiary'; 
import createDiary from '@salesforce/apex/createDiary.createD'; 
import TickerSymbol from '@salesforce/schema/Account.TickerSymbol';
import conDId from '@salesforce/schema/Diary__c.Contact__c';
import DName from '@salesforce/schema/Diary__c.Name';
import { getRecord } from 'lightning/uiRecordApi';
import { createRecord } from 'lightning/uiRecordApi';
import DMainObject from '@salesforce/schema/Diary__c';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Diary extends LightningElement {
    @api    Diary =[];
    @api recordId;
    text
     @wire(getDiary, { recordId: '$recordId',   })
     Diary;
  
      @track Diary;
     DeleteNote(event) {
        
         console.log(event.target.dataset.id );
        deleteRecord(event.target.dataset.id )
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record deleted',
                        variant: 'success'
                    })
                );
                // Navigate to a record home page after
                // the record is deleted, such as to the
                // contact home page
                refreshApex(this.Diary)
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
     
    }
 
saveNote(event){
    console.log(event.target.value);
    this.text = event.target.value;
  
  }
createNote(){
    console.log(  this.recordId,   this.text + 'parameters to input');
     
    // createDiary({ con:  this.recordId, name:  this.text})
    //  .then((result) => {
       
    //     console.log(result);
       
    //     console.log(this.contacts);
    // })
    console.log( this.text,   this.recordId );
    const fields = {};
    fields[DName.fieldApiName] = this.text;
    fields[conDId.fieldApiName] = this.recordId;
     
   
    const recordInput = { apiName: DMainObject.objectApiName, fields };
    createRecord(recordInput)
        .then(contactobj=> {
            this.contactId = contactobj.id;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Diary record has been created',
                    variant: 'success',
                }),
                refreshApex(this.Diary)
            );
            
             

        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error',
                }),
            );
        });
    }
//     @api recordId;
//     @api s = [];
//    // @api 
//    @track  Diary =[];
//   //  @track Diary;
//    // @track Diary;
//     connectedCallback() {
//        console.log(this.recordId);
     
//        getDiary({id: this.recordId })
//         .then((result) => {
//               console.log((result[0]) +'result JSON');
        
             
// //         //     this.Diary = result;
// //         //     console.log(typeof JSON.stringify(result) +'result JSON');
// //         //   console.log( result + 'result');
//  result.forEach(element => {
// //         //     console.log(typeof JSON.stringify(element) +'element JSON');
// //         //   console.log( element + 'element')
// //         //  s = result.keys(obj).map((key) => [Number(key), obj[key]])
// //         //  console.log( s + 'element')
// //         // console.log( element.Name);
//         this.Diary.push(element.Name);
//         this.Diary.push(element.Id);
//         this.Diary.push(element.CreatedDate);
//         this.Diary.push(element.Note__c);
//          console.log(this.Diary)
// //             // element.forEach(el => {
// //             //     console.log(JSON.stringify(el) +'el JSON');
// //             // console.log( el + 'el')
// //             // this.Diary.push(el);
         
// //        })

    
    
//    })
//     } )
   
   // }
      
    // s = this.recordId
    // @wire(getDiary, {id: this.recordId })
    //  Diary;

}