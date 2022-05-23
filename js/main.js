$(document).ready(function(){
			
			$('#ajoutArticle').click(function(){
				
				$('#content').load('addArticle.php')
			});
			$('#kopa').click(function(){
				
				$('#content').load('pp.php')
			});

			$('#accueil').click(function(){
				
				$('#content').load('listeArticle.php')
			});

			$('#ajoutCategorie').click(function(){
				
				$('#content').load('addCategorie.php')
			});

			$('#formSearch').on("submit", function(e){

					e.preventDefault();
				    var recherche = $('#search').val();
				    $.ajax({
				    	url:"../controller/article.contr.php",
				    	method:"POST",
				    	data:{search:recherche},
				    	success: function (data){

				    		var response = JSON.parse(data);
				    		$('#table').html(response.table);
        					 Swal.fire(response.message)

				    	}
				    })

			});


		$('#formUpdate').on("submit", function(e){
				e.preventDefault();

			Swal.fire({
  title: 'Vous êtes sûre de modifier cet article?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Oui!',
  cancelButtonText: 'Non!'
}).then((result) => {
  if (result.value) {
						
				$.ajax({
					url:"../controller/article.contr.php",
					method:"POST",
					data:new FormData(this),
					contentType:false,
    				cache:false,
    				processData:false,
    				success: function(data){
					 
					 Swal.fire({title: "Mise à jour avec succès", icon: 'success'});
                      readData();
    				}

				});

				} else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              '',
              'Mise à jour annulé',
              'error'
            )
          }
        });  

			 

		});

		// $('#select').change(function(){

		// 	var valeur = $('#select').val();
		// 	alert(valeur);
		// });		


			
		});

		readData();

	
	
	function readData(){

		var read = "read"

		$.ajax({

			url: "../controller/article.contr.php",
			method:"POST",
			data:{readArticle:read},
			success: function(data){

				$('#table').html(data);
				
			}	
		})
	}


	function suppr(id){

			
		Swal.fire({
  title: 'Vous êtes sûre de vouloir supprimer cet article?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Oui!',
  cancelButtonText: 'Non!'
}).then((result) => {
  if (result.value) {
			

			$.ajax({
			 url:"../controller/article.contr.php",
			 method:"POST",
			 data:{idArticle:id},
			 success: function(data){
			 	
			 	  Swal.fire({title: "Suppression avec succès", icon: 'success'});
                      readData();

			 }
		});

			} else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              '',
              'Suppression annulée',
              'error'
            )
          }
        });  

			  
			  
	
			
			}

		function recup(id){

				$.ajax({
					url:"../controller/article.contr.php",
					method: "POST",
					data:{idUpdate:id},
					success:function(data){
              		var  article = JSON.parse(data)
              		$('#titre').val(article.titre)
              		$('#auteur').val(article.auteur)
              		$('#date').val(article.date_de_publication)
              		$('#contenu').val(article.contenu)
              		$('#idArticle').val(article.id_article)


					}
				})
		}


		var listCategorie = document.querySelectorAll("#listCat");

		var data = ""
		listCategorie.forEach((item) => {
			item.addEventListener("click", () => {
			data = item.getAttribute("cat")
			$.ajax({
				url:"../controller/article.contr.php",
				method: "POST",
				data:{item:data},
				success: function(data){

					$('#table').html(data);

				}
			})


			}) 



		})

		function viewArticle(id){

				$.ajax({

					url:"../controller/article.contr.php",
					method:"POST",
					data:{articleId:id},
					success : function(data){
					var response = JSON.parse(data)
					let numArticle = document.querySelector("#numArticle")
					let imageArticle = document.querySelector("#imageArticle")
					let articleTitre = document.querySelector("#articleTitre")
					let textArticle =  document.querySelector("#textArticle")
					let date =  document.querySelector("#date")
					let auteur =  document.querySelector("#auteur")
				    imageArticle.setAttribute("src",`../public/stockage_img/${response.photo} `)
				    numArticle.innerText = response.id_article
				    articleTitre.innerText = response.titre
				    date.innerText = response.date_de_publication
				    auteur.innerText = response.auteur
				    textArticle.innerText = response.contenu
				    


					



					}

				})

		}


		

		

		
