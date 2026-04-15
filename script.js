const produit = [
    { "id": 1, "nom": "Laitue", "prix": 20000, "image": "laitus.jpg" },
    { "id": 2, "nom": "Carotte", "prix": 1000, "image": "téléchargement.jpeg" },
    { "id": 3, "nom": "Betterave", "prix": 10000, "image": "beterave.jpeg" },
    { "id": 4, "nom": "Poivron", "prix": 1000, "image": "poivron.jpeg" },
    { "id": 5, "nom": "Haricot Vert", "prix": 2000, "image": "haricotVert.jpeg" },
    { "id": 6, "nom": "Tomate", "prix": 2500, "image": "tomate.webp" },
    { "id": 7, "nom": "Oignon", "prix": 1000, "image": "oignon.jpg" },
    { "id": 8, "nom": "Piment vert", "prix": 10000, "image": "piment.jpg" },
    { "id": 9, "nom": "Persil", "prix": 5000, "image": "percile.jpg" },
    { "id": 10, "nom": "Choux", "prix": 10000, "image": "choux.webp" }
    
    
    
];

let panier = [];

function afficherProduits() {
    let div = document.getElementById("produits");
    div.innerHTML = "";
    produit.forEach(prd => {
        const mondiv = document.createElement("div");
        mondiv.className = "produit";
        mondiv.innerHTML = ` 
            <img src="${prd.image}" alt="${prd.nom}"/>
            <div class="infoproduit">    
                <h3>${prd.nom}</h3> 
                <p>${prd.prix} FCFA</p> 
                <button onclick="ajouterProduit(${prd.id})">Ajouter au panier</button> 
            </div>`;
        div.append(mondiv);
    });
}

function ajouterProduit(id) {
    const prd = produit.find(P => P.id == id);
    const produit_panier = panier.find(p => p.id == id);
    if (produit_panier) {
        produit_panier.quantite++;
    } else {
        panier.push({ ...prd, quantite: 1 });
    }
    rechargerTout();
}

function modifierProduit(id, action) {
    const p = panier.find(item => item.id == id);
    if (p) {
        if (action === 'plus') p.quantite++;
        else p.quantite--;
        
        if (p.quantite <= 0) supprimerProduit(id);
    }
    rechargerTout();
}

function supprimerProduit(id) {
    panier = panier.filter(p => p.id !== id);
    rechargerTout();
}

// Cette fonction met à jour les DEUX paniers (milieu et angle)
function rechargerTout() {
    // 1. Générer le contenu HTML des articles
    const htmlContenu = panier.length === 0 ? "<p>Le panier est vide</p>" : panier.map(p => `
        <div style="border-bottom: 1px solid #ddd; padding: 10px 0; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <strong>${p.nom}</strong><br>
                <small>${p.prix} x ${p.quantite}</small>
            </div>
            <div>
                <button onclick="modifierProduit(${p.id}, 'plus')">+</button>
                <button onclick="modifierProduit(${p.id}, 'moins')">-</button>
                <button onclick="supprimerProduit(${p.id})" style="background:none; border:none; color:red; cursor:pointer;">🗑️</button>
            </div>
        </div>
    `).join('');

    // 2. Envoyer dans le panneau latéral UNIQUEMENT
    document.getElementById("liste-articles").innerHTML = htmlContenu;
    
    // 3. Calculer et afficher le total à l'intérieur du panneau
    const totalVente = panier.reduce((sum, p) => sum + (p.prix * p.quantite), 0);
    document.getElementById("total").textContent = totalVente;

    // 4. Mettre à jour le compteur sur la bulle 🛒
    const nbTotal = panier.reduce((sum, p) => sum + p.quantite, 0);
    document.getElementById("compteur").textContent = nbTotal;
}

function togglePanier() {
    document.getElementById('panier-contenu').classList.toggle('cache');
}

// Lancement au chargement
afficherProduits();
