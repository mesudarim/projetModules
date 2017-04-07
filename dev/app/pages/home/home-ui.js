export function homeSkeleton(data){
  return `
    <section class=" valign-wrapper ">
      <div class="valign">
        <div class=" row">
          <div class="col s6 offset-s3">
            <h1>${data.pageTitle}</h1>
            <form>
              <p>
                <label for="email">Email:</label> <input type="email" name="email" value="" placeholder="your@email.com"  /><br/>
                <label for="password">Password:</label> <input type="password" name="password" value=""  /><br/>
                <button>Login</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>`;
}
