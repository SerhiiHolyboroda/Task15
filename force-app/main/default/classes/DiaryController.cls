public class DiaryController {
@AuraEnabled(cacheable=true)
    public static List<Diary__c> getDiary(String recordId){
        return [SELECT Id, Name, CreatedDate, Note__c FROM Diary__c where Contact__c  = :recordId ];
    }
}