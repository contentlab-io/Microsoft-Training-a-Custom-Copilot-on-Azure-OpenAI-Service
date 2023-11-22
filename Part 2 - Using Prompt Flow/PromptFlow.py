from promptflow import tool
from promptflow.connections import CustomConnection
from azure.core.credentials import AzureKeyCredential
from azure.search.documents import SearchClient

# The inputs section will change based on the arguments of the tool function, after you save the code
# Adding type to arguments and return value will help the system show the types properly
# Please update the function name/signature per need
@tool
def my_python_tool(question:str, myconnection:CustomConnection) -> str:

  search_client = SearchClient(myconnection.endpoint, myconnection.index, AzureKeyCredential(myconnection.key))
  results = search_client.search(search_text=question)

  returnValue = "Answer not found."
  category = ""

  for result in results:
    if result["@search.score"] > 9:
      returnValue = f'Answer: {result["Answer"]}\n'
      category = result["Category"]
  
  if category:
      extra_data_results = search_client.search(search_text=category)
      if extra_data_results:
          returnValue += f"Category: {category}\n, Category questions: "
          for extra_data_result in extra_data_results:
              returnValue += f'"{extra_data_result["Question"]}",\n'
      
  return returnValue
