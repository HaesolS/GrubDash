<h1>Project: GrubDash</h1>
<p>You've been hired as a backend developer for a new startup called <i>GrubDash</i>! As another developer works on the design and frontend experience, you have been tasked with setting up an API and building out specific routes so that the frontend developers can demo some initial design ideas for the big bosses.</p>

<p><img src="https://github.com/HaesolS/GrubDash/assets/147211855/6d68bc21-c0fd-4baf-9ab6-42c00c1d2a15"></p>

<p>This project will test your ability to build APIs with complex validation.
To succeed at this project, you'll need to demonstrate that you can do the following:</p>
<ul>
 <li>Run tests from the command line</li>
 <li>Use common middleware packages</li>
 <li>Receive requests through routes</li>
 <li>Access relevant information through route parameters</li>
 <li>Build an API following RESTful design principles</li>
 <li>Write custom middleware functions</li>
</ul>

<h2>Instructions</h2>
<p>You will be creating a server to access two resources, <code>dishes</code> and <code>orders</code>, in addition to error handling.</p>

<h3>Existing files</h3>
<p>
<table>
  <tr>
    <th>File path</th>
    <th>Description</th>
  </tr>
  <tr>
    <th><code>src/dishes/dishes.controller.js</code></th>
    <th>Add handlers and middleware functions to create, read, update, and list dishes. Note that dishes cannot be deleted.</th>
  </tr>
  <tr>
   <th><code>src/dishes/dishes.router.js</code></th>
   <th>Add two routes: <code>/dishes</code>, and <code>/dishes/:dishId</code> and attach the handlers (create, read, update, and list) exported from <code>src/dishes/dishes.controller.js</code></th>
  </tr>
  <tr>
   <th><code>src/orders/orders.controller.js</code></th>
   <th>Add handlers and middleware functions to create, read, update, delete, and list orders.</th>
  </tr>
  <tr>
   <th><code>src/orders/orders.router.js></code></th>
    <th>Add two routes: <code>/orders</code>, and <code>/orders/:orderId</code> and attach the handlers (create, read, update, delete, and list) exported from <code>src/orders/orders.controller.js</code>.</th>
  </tr>
  <tr>
   <th><code>src/utils/nextId.js	</code></th>
   <th>Anytime you need to assign a new <code>id</code> to an order or dish, use the <code>nextId</code> function exported from here.</th>
  </tr>
</table>

<h3>Routes</h3>
<p>To complete this project, you will create the following routes:</p>
<p><h4><code>GET /dishes</code></h4></p>
<p>This route will respond with a list of all existing dish data.
<p><h4><code>POST /dishes</code></h4></p>
<p>This route will save the dish and respond with the newly created dish.</p>
<p><h5>Validation></h5></p>
<p>If any of the following validations fail, respond with a status code of <code>400</code> and an error message.</p>
<table>
 <tr>
  <th>Validation</th>
  <th>Error message</th>
 </tr>
 <tr>
  <th><code>name</code> property is missing</th>
  <th>Dish must include a name</th>
 </tr>
 <tr>
  <th><code>name</code> property is empty <code>""</code></th>
  <th>Dish must include a name</th>
 </tr>
  <tr>
  <th><code>description</code> property is missing</th>
  <th>Dish must include a description</th>
 </tr>
  <tr>
  <th><code>description</code> property is empty <code>""</code></th>
  <th>Dish must include a description</th>
 </tr>
  <tr>
  <th><code>price</code> property is empty <code>""</code></th>
  <th>Dish must include a description</th>
 </tr>
  <tr>
  <th><code>price</code> property is missing</th>
  <th>Dish must include a price</th>
 </tr>
  <tr>
  <th><code>price</code> property 0 or less</th>
  <th>Dish must have a price that is an integer greater than 0</th>
 </tr>
  <tr>
  <th><code>price</code> property is not an integer</th>
  <th>Dish must have a price that is an integer greater than 0</th>
 </tr>
  <tr>
  <th><code>image_url</code> property is missing</th>
  <th>Dish must include a image_url</th>
 </tr>
   <tr>
  <th><code>image_url</code> property is empty <code>""</code></th>
  <th>Dish must include a image_url</th>
 </tr>
</table>
<p><h4><code>GET /dishes/:dishId</code></h4></p>
<p>This route will respond with the dish where <code>id === :dishId</code> or return <code>404</code> if no matching dish is found.
<p><h4><code>PUT /dishes/:dishId</h4></p>
<p>This route will update the dish where id === :dishId or return 404 if no matching dish is found.</p>
<p><h5>Validation</h5></p>
<p>The update validation must include all of the same validation as the <code></code>POST /dishes</p>code> route, plus the following:</p>
<table>
 <tr>
  <th>Validation</th>
  <th>Error message</th>
 </tr>
 <tr>
  <th><code>:dishId</code> does not exist</th>
  <th><code>Dish does not exist: ${dishId}.</code></th>
 </tr>
 <tr>
  <th><code>id</code> in the body does not match <code>:dishId</code> in the route</th>
  <th><code>Dish id does not match route id. Dish: ${id}, Route: ${dishId}</code></th>
 </tr>
</table>
<p><i><b>Note:</b> The <code>id</code> property isn't required in the body of the request, but if it is present, it must match <code>:dishId</code> from the route.</i></p>
<p><h4><code>GET /orders</code></h4></p>
<p>This route will respond with a list of all existing order data.</p>
<p><h4><code>POST /orders</code></h4></p>
<p>This route will save the order and respond with the newly created order.</p>
<p><h5>Validation</h5></p>
<p>If any of the following validations fail, respond with a status code of <code>400</code> and an error message.</p>
<table>
 <tr>
  <th>Validation</th>
  <th>Error message</th>
 </tr>
 <tr>
  <th><code>deliverTo</code> property is missing</th>
  <th>Order must include a deliverTo</th>
 </tr>
  <tr>
  <th><code>deliverTo</code> property is empty <code>""</code></th>
  <th>Order must include a deliverTo</th>
 </tr>
  <tr>
  <th><code>mobileNumber</code> property is missing</th>
  <th>Order must include a mobileNumber</th>
 </tr>
  <tr>
  <th><code>mobileNumber</code> property is empty <code>""</code></th>
  <th>Order must include a mobileNumber</th>
 </tr>
  <tr>
  <th><code>dishes</code> property is missing</th>
  <th>Order must include a dish</th>
 </tr>
  <tr>
  <th><code>dishes</code> property is not an array</th>
  <th>Order must include at least one dish</th>
 </tr>
  <tr>
  <th><code>dishes</code> array is empty</th>
  <th>Order must include at least one dish</th>
 </tr>
  <tr>
  <th>A dish <code>quantity</code> property is missing</th>
  <th><code>dish ${index} must have a quantity that is an integer greater than 0</code></th>
 </tr>
  <tr>
  <th>A dish <code>quantity</code> property is zero or less</th>
  <th><code>dish ${index} must have a quantity that is an integer greater than 0</code></th>
 </tr>
  <tr>
  <th>A dish <code>quantity</code> property is not an integer</th>
  <th><code>dish ${index} must have a quantity that is an integer greater than 0</code></th>
 </tr>
</table>
<p><i><b>Note:</b> Each dish in the Order's <code>dishes</code> property is a complete copy of the dish, rather than a reference to the dish by ID. This is so the order does not change retroactively if the dish data is updated some time after the order is created.</i></p>
<p><h4><code>GET /orders/:orderId</code></h4></p>
<p>This route will respond with the order where <code>id === :orderId</code> or return <code>404</code> if no matching order is found.</p>
<p><h4><code>PUT /orders/:orderId</code></h4></p>
<p>This route will update the order where <code>id === :orderId</code>, or return <code>404</code> if no matching order is found.</p>
<p><h5>Validation:</h5></p>
<p>The update validation must include all of the same validation as the <code>POST /orders</code> route, plus the following:</p>
<table>
 <tr>
  <th>Validation</th>
  <th>Error message</th>
 </tr>
 <tr>
  <th><code>id</code> of body does not match <code>:orderId</code> from the route</th>
  <th><code>Order id does not match route id. Order: ${id}, Route: ${orderId}.</code></th>
 </tr>
  <tr>
  <th><code>status</code> property is missing</th>
  <th>Order must have a status of pending, preparing, out-for-delivery, delivered</th>
 </tr>
  <tr>
  <th><code>status</code> property is empty</th>
  <th>Order must have a status of pending, preparing, out-for-delivery, delivered</th>
 </tr>
  <tr>
  <th><code>status</code> property of the existing <code>order === "delivered"</code></th>
  <th>A delivered order cannot be changed</th>
 </tr>
</table>
<p><i><b>Note:</b> The <code>id</code> property isn't required in the body of the request, but if it is present it must match <code>:orderId</code> from the route.</i></p>
<p><h4><code>DELETE /orders/:orderId</code></h4></p>
<p>This route will delete the order and return a <code>204</code> where <code>id === :orderId</code>, or return <code>404</code> if no matching order is found.</p>
<p><h5>Validation</h5></p>
<p>The delete method must include the following validation:</p>
<table>
 <tr>
  <th>Validation</th>
  <th>Error message</th>
 </tr>
 <tr>
  <th><code>status</code> property of the <code>order !== "pending"</code></th>
  <th>An order cannot be deleted unless it is pending. Returns a <code>400</code> status code</th>
 </tr>
</table>
