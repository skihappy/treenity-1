````
function* watcher(self:processMeta,deps:[path])=>Promise
const processMeta=meta.inherit ({
    snaps: array[snapshot],
    curCursor:int.default(0),
    processCursor:int.default(0),
    workflowFunc:function(self:processMeta)*,
    isActive:bool,
    actions:{
        ticForward:(tics:int)=>bool
        waitFor:function*(watcher:watcher):Any,
        start:()=>null,
        dispatch:(action:action)=>Any
    }
})

const useProcess=(self:meta,deps:[path]):{
    process:ProcessMeta,
    waitFor:waitFor,
    dispatch:dispatchProcessAction
}=>{
    
}

```
Process types logic that is spread out in space and time. It is a sequence of conditional
events and actions. A process component can be instantiated in at any point is structure, at any time
Of course, some might be restricted to particular regions of spaceTime.
Processes are designed to be persistent and serializable. Process keeps track of itself by a taking snapshots of 
treenity tree at any important junction. Once a process is started, it will proceed down its timely path and will never
repeat any actions twice, no matter how many times it was rehydrated and restarted. A process, basically a stateful function
that controls which part of itself is executed at each invokation.

There are two syntaxes available. a more general workflow function style and react specific variant.
A process is always associated with its controller, a treenity meta. This is its state. Theres also a function guiding the 
process logic - the workflow function. In the general case, the workflow function is specified at process instantiation.
It is a generator function being controlled by the process instance, the meta. Workflow function can be paused by
waitFor method. This is a nested generator that yields till a condition is met. Its main claim  to faim is taking a 
snapshot whenever condition is met, along with advancing the current cursor of the process. So, once started, the process
will have the life of its own, stopping when in doubt and making its own decisions, perhaps yelling out a few events or
recording some additional state info in its meta.
The boilerplate provides a few built in events like start and stop and waitStart, waitEnd for each decision point.
The two syntaxes are have slightly different implementations.  In general one, a generator function is used to control process logic.
The generator is controlled by the meta instance of the process thru its lifetime. 
Then, theres a react specific version. It uses a useProcess hook to create a process meta.  The hook returns few usefull funcs related
to process logic, waitFor and dispatch. The workflow generator func is seemingly missing.  However, the react component
func is the workflow func. Its not a generator, for react controlls it in its own way.  Therefore, implementations of 
those two helper funcs is slightly different.
