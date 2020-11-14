I see a lot of syntactic issues popping up due to separation of nodes and metas into two distinct enteties.
Each node is a generic container for some entety. That node entety often will have to have its own api. A parent node
 ,being a generic container, does not have its own methods and actions. So, a special meta of api type might be used, to
  perform nodewide actions. 
  
  So, suppose we are addressing an action in a meta using path node1.node2.metaOfNode2.someAction Over time, as 
  structure evolves, metaOfNode2 needs to expand into a node while maintaining its api. That means the path to someAction
  will become node1.node2.metaOfNode2.api.someAction. That means all the code accessing someAction is broken now. 
  
  My point is, keeping node and meta separation will create great difficulties in providing mechanisms for the users to 
  evolve the tree structure.
  
  I propose the following change to the design. As now, nodes are metas, but they are allowed to have custom actions and 
  props, being typed just as metas. So, lets call them all nodes or metas.  
  
  So, the only difference we introduced is a children array in base meta model. If meta has children and does not have 
  custom api, thats our old node, which is a meta of type node. So, we still have an entety called node, as before, but 
  its nothing special, just a meta of certain type. If anyone desires to use such node metas exclusively as meta 
  containers, they certainly can. However, it lifts draconian restrictions for the rest of us to do as apprpriate for 
  our use case or abstraction.
  
  Another  problem I see is having all meta children in an array, rather then a dictionary keyd on childs name. I see
  a lot of boilerplate apis being created to access the children. Yes, 
  we would lose the index order. But, that can be addressed by each use case, where the order might be different for 
  each use case. If the order of child creation is important, an childOrder array can be added as a meta prop, containing
  children names. All im saying, lets have it both ways to facilitate nice syntax for any use case. 
  
  We can do even better then that, uniting array and dict type of access to children. We can have a unified syntax of access, 
  thru stringy paths. e.g. consider 
  ```
  const Path=class {
   constructor(path){...}
   resolve(){...}
  }   
  
  const myPath=new Path('../node1/1/2')
  console.log(myPath.resolve()) /*node1.parent.childArr[1].childArr[2] */
  ```
  
  Whats at stake is the developer experience. Its a huge mental burden to fit abstractions into an unflexible syntax.
  
  
