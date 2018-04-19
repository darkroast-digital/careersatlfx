<?php
namespace App\Controllers;

use App\Controllers\Controller;
use Mailgun\Mailgun;

class HomeController extends Controller
{
    public function index($request, $response, $args)
    {

        return $this->view->render($response, 'home.twig');
    }

    public function post($request, $response, $args)
    {
        $mg = Mailgun::create('key-1715c074f053673f6e3c4c79e8595390');

        $params = $request->getParams();

        $name = $params['name'];
        $email = $params['email'];
        $phone = $params['phone'];
        $city = $params['city'];
        $companiesArray = $params['companies'];
        $interests = $params['interests'];
        $motivation = $params['motivation'];
        $careerNeeds = $params['careerNeeds'];
        $careerWants = $params['careerWants'];
        $wowed = $params['wowed'];
        $island = $params['island'];
        $previousJobs = $params['previousJobs'];
        $additionalInfo = $params['additionalInfo'];

        $companies = '';

        foreach ($companiesArray as $company) {
            $companies .= $company . ', ';
        }

        $companies = substr($companies, 0, -2);

        if (isset($_FILES['resume'])) {
            $resume = $_FILES['resume'];
        }

        $body = "What is your FIRST and LAST NAME?: $name<br/>
                What is your EMAIL ADDRESS?: $email<br/>
                What is your PHONE NUMBER?: $phone<br/>
                What CITY do you currently live in?: $city<br/>
                Which of our companies INTERESTS YOU the most?: $companies<br/>
                What are some of your INTERESTS and HOBBIES?: $interests<br/>
                What MOTIVATES you?: $motivation<br/>
                What do you NEED out of your career?: $careerNeeds<br/>
                What do you WANT out of your career?: $careerWants<br/>
                Describe the last time you were WOWED by something or someone: $wowed<br/>
                You're going to be trapped on a deserted island. You can bring any 3 items (excluding any electronic devices). What do you bring with you and why?: $island<br/>
                Rate your last 3 jobs by BEST to WORST and explain your decisions: $previousJobs<br/>
                What else would you like us to know about YOU?: $additionalInfo";

        if ($resume) {
            $mg->messages()->send('careersatlfx.com', [
              'from'    => $email,
              'to'      => 'trevor@darkroast.co',
              'subject' => $name . ' has filled out an application at careersatlfx.com',
              'html'    => $body,
              'attachment' => [
                ['filePath' => $resume['tmp_name'], 'filename' => $resume['name']]
              ]
            ]);
        } else {
            $mg->messages()->send('careersatlfx.com', [
              'from'    => $email,
              'to'      => 'trevor@darkroast.co',
              'subject' => $name . ' has filled out an application at careersatlfx.com',
              'html'    => $body
            ]);
        }
    }
}
