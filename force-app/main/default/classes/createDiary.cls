public class createDiary {
@AuraEnabled()

    public static void createD(String con , String name) {
        try {
        Diary__c d = new Diary__c(
            	Name =name ,
             
            	Contact__c =con);
            insert d;
        } catch(DmlException e) {
            System.debug('An unexpected error has occurred: ' + e.getMessage());
        }
    }
}