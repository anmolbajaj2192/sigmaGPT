# Functionality:
basic: prompt hum bhejenge in form of input aur reply open ai api use karke backend se aajaye
will use 2 state variables which we will pass using context api provider values, prompt and reply will be 2 variable.
so in app.jsx, create new state variables and initialize null value.
in providerValue will pass prompt, setPrompt, reply, setReply
in ChatWindow.jsx, we are dealing with prompt and replies, where will import both state varibles, so we imported MyContext.jsx, then will const{}=useContext(MyContext), 
in input tag will add value = {prompt} and onChange fnx within that if event occur then setPrompt(e.target.value) so with this our input is saved in value
now once the input like 'what is 2+2' is visible and click on send button then, on 'submit' button will add getReply which is fnx which is created. 
getReply is async fnx, prepare options-> method:Post, content type: applicaiton/json, body:message:prompt, threadId