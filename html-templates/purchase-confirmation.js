const email_template = props => {
  const { product_id, product_name } = props
  const email = `
	<!DOCTYPE html>
	<html >
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>w3newbie HTML Email</title>
		<style type="text/css">
			body {
				Margin: 0;
				padding: 0;
			}
			table {
				border-spacing: 0;
			}
			td {
				padding: 0;
			}
			img {
				border: 0;
			}

			@media screen and (max-width: 600px) { 
			}
			@media screen and (max-width: 400px) { 
			}
		</style>
	</head>
	<body>
		<table>
			<tr>
				<h2>Nowe zamówienie</h2>	
			</tr>
			<tr>
				<h6>${product_name}</h6>
			</tr>
			<tr>
				<p>${product_id}</p>
			</tr>
		</table>

	</body>
	</html>`

  return email
}

module.exports = { email_template }
