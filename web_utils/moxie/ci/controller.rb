

module Moxie
  
  class Generate
    
    def self.controller(name)
      
      tmpl = ["<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');",
              "",
              "class #{name.cap_first} extends Base_Controller",
              "{",
                "public function index()",
                "{",
                  "$this->render('#{name}/index');",
                "}",
              "}",
              "",
              "/* End of file home.php */",
              "/* Location: ./application/controllers/home.php */"
              ].join('\n')
      
      
      # create #{name}.php in /application/controllers/
      f = "/application/controllers/#{name}.php"
      
      if !exists? f
        IO.open(f, "-w") do |io|
          io.write(tmpl)
        end
      end
      
      
      
      
    end
    
    
    
  end
  

end