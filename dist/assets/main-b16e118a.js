import{c as i,a as s,s as l}from"./firebase-5f078573.js";document.getElementById("register-btn").addEventListener("click",()=>{const t=document.getElementById("content");t.innerHTML=`
        <h2 class="text-xl font-semibold mb-4">Registro</h2>
        <form id="register-form" class="space-y-4">
            <input type="email" id="register-email" placeholder="Correo electrónico" class="w-full px-4 py-2 border rounded-lg" required>
            <input type="password" id="register-password" placeholder="Contraseña" class="w-full px-4 py-2 border rounded-lg" required>
            <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700">Registrarse</button>
        </form>
    `,document.getElementById("register-form").addEventListener("submit",async r=>{r.preventDefault();const n=document.getElementById("register-email").value,o=document.getElementById("register-password").value;try{const e=await i(s,n,o);alert(`Usuario registrado: ${e.user.email}`)}catch(e){console.error("Error en el registro:",e),alert(`Error en el registro: ${e.message}`)}})});document.getElementById("login-btn").addEventListener("click",()=>{const t=document.getElementById("content");t.innerHTML=`
        <h2 class="text-xl font-semibold mb-4">Iniciar Sesión</h2>
        <form id="login-form" class="space-y-4">
            <input type="email" id="login-email" placeholder="Correo electrónico" class="w-full px-4 py-2 border rounded-lg" required>
            <input type="password" id="login-password" placeholder="Contraseña" class="w-full px-4 py-2 border rounded-lg" required>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Iniciar Sesión</button>
        </form>
    `,document.getElementById("login-form").addEventListener("submit",async r=>{r.preventDefault();const n=document.getElementById("login-email").value,o=document.getElementById("login-password").value;try{const e=await l(s,n,o);alert(`Bienvenido: ${e.user.email}`),window.location.href="/profile.html"}catch(e){console.error("Error al iniciar sesión:",e),alert(`Error al iniciar sesión: ${e.message}`)}})});document.getElementById("register-match-btn").addEventListener("click",()=>{window.location.href="/match.html"});
