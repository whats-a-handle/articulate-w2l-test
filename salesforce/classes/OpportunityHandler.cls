public class OpportunityHandler {
    //pretend we give people two weeks to close or have their opp marked as lost.
	public static Date defaultCloseDate = Date.today() + 14; 
    public static String defaultStageName = 'Prospecting';
    
    public static Map<Id,List<Opportunity>> idToOpportunityMap(List<Opportunity> opportunities){
        Map<Id,List<Opportunity>> idOpportunityMap = new Map<Id,List<Opportunity>>();
        
        for(Opportunity opportunity : opportunities){
            if(idOpportunityMap.containsKey(opportunity.Lead__c)){
                idOpportunityMap.get(opportunity.Lead__c).add(opportunity);
            }
            else{
                idOpportunityMap.put(opportunity.Lead__c, new List<Opportunity>{opportunity});
            }
        }
        
        return idOpportunityMap;
      
    }
    
    public static List<Opportunity> createNewLeadOpportunities(List<Lead> newLeads){
        List<Opportunity> newOpportunities = new List<Opportunity>();        
        
 
        
        for(Lead newLead : newLeads){
            if(!newLead.Is_Duplicate__c){
                Opportunity newOpportunity = new Opportunity(
                    Name = newLead.Company + ' - ' + newLead.FirstName + ' ' + newLead.LastName,
                    CloseDate = defaultCloseDate,
                    Lead__c = newLead.id,
                    StageName = defaultStageName
            	);
                newOpportunities.add(newOpportunity);
            }
            
        }
   		return newOpportunities;
    }
}