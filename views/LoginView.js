function loginView(){
    return `<html><body><main>
    <form method='post' action='/login'>
    <label for='nom'>Nom : </label>
    <input type='text' id='nom' name='nom' placeholder='nom' required>    
    <label for='password'>Password : </label>
    <input type='password' id='password' name='password' placeholder='password' required>
    <input type='submit' value='Login'>
    </form>
    </main></body></html>`;
}
module.exports=loginView;