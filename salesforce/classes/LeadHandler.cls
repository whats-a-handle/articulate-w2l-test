public class LeadHandler {
    
    public static Map<String, List<Lead>> mapLeadsToEmail(List<Lead> leads){
        Map<String, List<Lead>> emailLeadMap = new Map<String, List<Lead>>();
        
        for(Lead lead : leads){
            if(emailLeadMap.containsKey(lead.Email)){
                emailLeadMap.get(lead.Email).add(lead);
            }
            else{
                emailLeadMap.put(lead.Email, new List<Lead>{lead});
            }
        }
        
        return emailLeadMap;  
    }

    public static Map<String, List<Lead>> markDuplicateLeads(List<Lead> originalLeads, Map<String,List<Lead>> newLeads){
        
        for(Lead originalLead : originalLeads){
            if(newLeads.containsKey(originalLead.Email)){
                for(Lead duplicateLead : newLeads.get(originalLead.Email)){
                    duplicateLead.Is_Duplicate__c = true;
                    duplicateLead.Original_Lead__c = originalLead.id;
                    duplicateLead.Status = 'Closed - Duplicate';
                }
            }
        }
        
        return newLeads;
    }    
    
    public static Map<String,List<Lead>> processDuplicateLeads(List<Lead> newLeads){
        List<Lead> originals = new List<Lead>();
		Map<String, List<Lead>> emailLeadMap = mapLeadsToEmail(newLeads);
        
        originals = [Select Id, Email, Is_Duplicate__c FROM Lead 
                     WHERE Email IN: emailLeadMap.keySet() 
                     AND Is_Duplicate__c =: false ];
        
        emailLeadMap = markDuplicateLeads(originals,emailLeadMap);
        

        return emailLeadMap;
    }
    
    
    
    public static void beforeInsert(List<Lead> newLeads){
        Map<String,List<Lead>> processedLeads = processDuplicateLeads(newLeads);
    } 
    public static void afterInsert(Map<Id,Lead> newLeads){
        List<Opportunity> opportunitiesForInsert = new List<Opportunity>();
        List<Task> tasksForInsert = new List<Task>(); 
        
        opportunitiesForInsert.addAll(OpportunityHandler.createNewLeadOpportunities(newLeads.values()));
        database.insert(opportunitiesForInsert,false);
        tasksForInsert.addAll(TaskHandler.createFollowUpTaskLeads(newLeads.values(),opportunitiesForInsert));
        database.insert(tasksForInsert,false);
    }
    
}