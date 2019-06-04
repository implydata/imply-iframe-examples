# imply-iframe-examples

A set of examples of how to iFrame Pivot into your own app

## Prerequisites

- Node 10 running locally
- Imply 2.9.x on-prem available from [imply.io/get-started](https://imply.io/get-started) with the wikipedia [quickstart](https://docs.imply.io/on-prem/quickstart) data. 

## Examples

- [control-with-url](./control-with-url) shows how to control an iframe by modifying the URL via the URL API.
  
## Getting an App token
 - Download imply quickstart and follow the quick start guide:
  
    https://docs.imply.io/on-prem/quickstart
  
 - Navigate to imply-2.9.5/conf-quickstart/pivot/config.yaml and add `enableApiEndpoint: true`
 
   ![photo of settings](images/code.png "enableApiEndpoint")

 - Open Localhost:9095 and from the side menu navigate to settings. UNuder setting select Api tokens and click on new token to generate an app token.
  
  ![photo of ui-settings](images/settings.png "ui settings")
## Configuring a request 

   You can generate links that open to specific views to update iframe by POSTing to `http://localhost:9095/api/v1/mkurl`

   Requests to Imply ui requires three main components to be configured: 
   ####x-imply-api-token:
   This a header for the request, and should be set to the Api token generated in your local imply ui
   
   `"x-imply-api-token":"1a1b1cf8-fc83-495d-94d9-27f22836b81b"`
 
   ####Datacube: 
   This is the data source you are targeting. In imply ui if you select a data source the portions of the url directly after the /d/ will be the datacube value. 
   
   `"dataCube": "druid_wikipedia"`
 
   ####Essence: 
   The essence contains the filters you are searching by. To view the configuration add a filter in the ui and look at the payload of register under the network tab of inspect element. 
   
    `const essence = {
            "dataCube": "druid_wikipedia",
                "filter": {
                "clauses": [
                    {
                        "dimension": "__time",
                        "dynamic": {
                            "op": "timeRange",
                            "operand": {
                                "op": "ref",
                                "name": "m"
                            },
                            "duration": "P1D",
                            "step": -1
                        }
                    },
                    {
                        "dimension": "page",
                        "action" : "overlap",
                        "exclude": false,
                        "values": {
                            "elements" : [req.input]
                        },
                        "setType": "STRING",
                    }
                ]
            },`
      
  
## Additional Resources 

- Generating links into Imply documentation

  https://docs.imply.io/on-prem/special-ui-features/generating-links-into-imply
