public class TaskHandler {
    
    //If relating a Task to a Lead and populating the "WhatID" aka Related To, you will receive an error
	//https://success.salesforce.com/issues_view?id=a1p30000000eUwQAAU
	
    //If dupe lead inserted, add Task to Original Lead Page
    //If original Lead, add Task to Opportunity
    //Doesn't account for Converted leads.
    public static List<Task> createFollowUpTaskLeads(List<Lead> leads, List<Opportunity> opportunities){
        List<Database.SaveResult> saveResultList = new List<Database.SaveResult>();
        Map<Id,List<Opportunity>> idOpportunityMap = OpportunityHandler.idToOpportunityMap(opportunities);
        
        List<Task> tasks = new List<Task>();
            for(Lead lead : leads){
                
				if(!lead.Is_Duplicate__c){

                    for(Opportunity opportunity : idOpportunityMap.get(lead.id)){
                        System.Debug('Opportunity ID: ' + opportunity.id);
                            tasks.add(new Task(
                                OwnerId = lead.OwnerId,
                                //WhoId = lead.id,
                                WhatId = opportunity.Id, 
                                Status = 'Not Started',
                                Subject = 'Initial Followup - Enterprise Pricing Submission',
                                ActivityDate = Date.today()
                            ));
                        }
                }
                         				
                        else{
                             tasks.add(new Task(
                                    OwnerId = lead.OwnerId,
                                    WhoId = lead.Original_Lead__c,
                                    //WhatId = opportunity.Id,
                                    Status = 'Not Started',
                                    Subject = 'Duplicate Submission Followup - Enterprise Pricing Submission',
                                    ActivityDate = Date.today(),
                                    Description = createDuplicateLeadDescription(lead)
                                ));
                        }
             	
                
       
        }
        
        
       return tasks;
     
    }
    
    public static String createDuplicateLeadDescription(Lead lead){
        String description = '';
        
        description +='Name: ' + Lead.FirstName + ' ' + Lead.LastName + '\n';
        description += 'Email: ' + Lead.Email + '\n';
        description += 'Company: ' + Lead.Company +  '\n';
        description += 'Date Submitted: ' + DateTime.now().format(); //assumes theres a negligible difference in time between submission/creation
    	
        return description;
    }
    
    

}