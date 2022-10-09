# Core plugins for the POC for a Digital Twin for plant life

## Subgraphs in the Digital Twin store.
Each plugin receives a N3 store object. This object is used to locally store information about the Digital Twin. 
The plugins have the possibility to look for their needed semantic info within the remote repository and store it locally on the N3. BUT(!) it has to be in their own graph. The namint convention is: 'quad.object.id-fabname'.<br> 
quad.object.id = the quad passed from to the plugin
fabname = the pluginname

## Plugins
### WotFab
- the object key name is not translated into the graphdb. It becomes a blank node. The semantic information in there is therfore lost. Currenlty a title is needed into the TD.
- It is not possible to reconstitute the jsonld from its quad form