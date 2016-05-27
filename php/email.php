<?
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

	header('Content-Type: text/html; charset=utf-8');

	$headers = "Content-type: text/plain; charset = \"utf-8\"";

	$to = 'youremail@email.com';

	if (isset($_POST["email1"])) {
		$subject = "Contacts Us";

		$name1 = htmlspecialchars($_POST["name1"]);
		$email1 = htmlspecialchars($_POST["email1"]);
		$mess1 = htmlspecialchars($_POST["mess1"]);
		$ip1 = $_SERVER["REMOTE_ADDR"];

		$message = "Contacts Us \nName - ".$name1." \nE-mail - ".$email1." \nMessage - ".$mess1." \nIP - ".$ip1;

		$errors = "";
		if (empty($name1)) $errors .= "Empty \"Name\"<br><a href='/'>Go to frontpage</a><br>";
		if (empty($email1)) $errors .= "Empty \"E-mail\"<br><a href='/'>Go to frontpage</a><br>";

		if (empty($errors)) {
			mail($to, $subject, $message, $headers);
		}
		else if (!empty($errors)) {
			echo $errors;
		}
		else {
			echo "Error! Try again!";
		}
	} elseif (isset($_POST["email2"])) {
		$subject = "Subscribe";

		$email1 = htmlspecialchars($_POST["email1"]);
		$ip1 = $_SERVER["REMOTE_ADDR"];

		$message = "Subscribe \nE-mail - ".$email1." \nIP - ".$ip1;

		$errors = "";
		if (empty($email1)) $errors .= "Empty \"E-mail\"<br><a href='/'>Go to frontpage</a><br>";

		if (empty($errors)) {
			mail($to, $subject, $message, $headers);
		}
		else if (!empty($errors)) {
			echo $errors;
		}
		else {
			echo "Error! Try again!";
		}
	} else {
		header('Location: /');
		exit();
	}

} else {
	header('Location: /');
	exit();
}
?>