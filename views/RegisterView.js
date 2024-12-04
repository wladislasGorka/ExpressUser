function registerView(){
    return `<html><body><main>
    <form method='post' action='/register'>
    <label for='nom'>Nom : </label>
    <input type='text' id='nom' name='nom' placeholder='nom' required>    
    <label for='password'>Password : </label>
    <input type='password' id='password' name='password' placeholder='password' required>
    <input type='submit' value='register'>
    </form>
    </main></body></html>`;
}
module.exports=registerView;