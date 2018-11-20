@isTest
public class LeadHandlerTest {

    public static testMethod void testMapLeadsToEmail(){
        
        integer expectedEmailKeys = 2;
        integer expectedMapValues = 3;
        integer expectedDuplicates = 2;
        integer expectedUnmatching = 1;
        integer actualMapValues = 0;

        
        String expectedDuplicateEmail = 'duplicate@email.com';
        String expectedUnmatchingEmail = 'nomatch@email.com';
        Map<String,List<Lead>> emailToLeadMap = new Map<String,List<Lead>>();
        Lead initialLead = new Lead(LastName='Initial', Company='Company',Email=expectedDuplicateEmail);
        Lead matchingLead = new Lead(LastName='Matching', Company='Company', Email=expectedDuplicateEmail);
        Lead notMatching = new Lead(LastName='Not Matching', Company = 'Company 2', Email=expectedUnmatchingEmail);
        
        emailToLeadMap = LeadHandler.mapLeadsToEmail(new List<Lead>{initialLead,matchingLead,notMatching});
		
        
        
        for(String email : emailToLeadMap.keySet()){
            for(Lead lead : emailToLeadMap.get(email)){
                actualMapValues++;
            }
        }
        System.assertEquals(expectedMapValues,actualMapValues);
        System.assertEquals(expectedEmailKeys,emailToLeadMap.keySet().size());
        System.assertEquals(expectedDuplicates, emailToLeadMap.get(expectedDuplicateEmail).size());
        System.assertEquals(expectedUnmatching, emailToLeadMap.get(expectedUnmatchingEmail).size());
    }    
}