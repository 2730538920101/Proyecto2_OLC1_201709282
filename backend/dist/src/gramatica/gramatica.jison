//CODIGO JS
%{
    const { Literal } = require('../modelos/Expresiones/Literal');
    const { Arithmetic, ArithmeticOption } = require('../modelos/Expresiones/Arithmetic');
    const { Relational, RelationalOption } = require('../modelos/Expresiones/Relational');
    const { Logic, LogicOption } = require('../modelos/Expresiones/Logic');
    const { Ternary } = require('../modelos/Expresiones/Ternary');
    const { AccesArray } = require('../modelos/Expresiones/AccesArray');
    const { NewArray } = require('../modelos/Expresiones/NewArray');
    const { NewCleanArray } = require('../modelos/Expresiones/NewCleanArray');
    const { NewList } = require('../modelos/Expresiones/NewList');
    const { MiArray } = require('../modelos/Symbol/Array');
    const { List } = require('../modelos/Symbol/List');
    const { Access } = require('../modelos/Expresiones/Access');
    const { Params } = require('../modelos/Expresiones/Params');
    const { Casting } = require('../modelos/Expresiones/Casting');
    const { ArithmeticAccess } = require('../modelos/Expresiones/ArithmeticAccess');
    const { ArithmeticAccess2 } = require('../modelos/Expresiones/ArithmeticAccess2');
    const { ArithmeticAccessI } = require('../modelos/Instrucciones/ArithmeticAccessI');
    const { ArithmeticAccessI2 } = require('../modelos/Instrucciones/ArithmeticAccessI2');
    const { CallExp, TypeCallExp } = require('../modelos/Expresiones/CallExp');
    const { Call, TypeCall } = require('../modelos/Instrucciones/Call');
    const { Declaration } = require('../modelos/Instrucciones/Declaration');
    const { Function } = require('../modelos/Instrucciones/Function');
    const { Statement } = require('../modelos/Instrucciones/Statement');
    const { Assigment } = require('../modelos/Instrucciones/Assigment');
    const { AccessArrayAssigment } = require('../modelos/Instrucciones/AccessArrayAssigment');
    const { Break } = require('../modelos/Instrucciones/Break');
    const { Continue } = require('../modelos/Instrucciones/Continue');
    const { Return } = require('../modelos/Instrucciones/Return');
    const { If } = require('../modelos/Instrucciones/If');
    const { While } = require('../modelos/Instrucciones/While');
    const { DoWhile } = require('../modelos/Instrucciones/DoWhile');
    const { Case} = require('../modelos/Instrucciones/Case');
    const { Switch } = require('../modelos/Instrucciones/Switch');
    const { For } = require('../modelos/Instrucciones/For');
    const { errores } = require('../modelos/Errores/ErrorList'); 
    const { MiError, TypeError} = require('../modelos/Errores/Error');
    console.log("SE COMPILO EL ARCHIVO .JISON");
%}


//configuraciones
%lex
%options case-insensitive

char                [\']([\\].|[^\'\n])[\']
int                 [0-9]+
boolean             'true'|'false'
double              {int}'.'{int}  
string              [\"]([\\][\"]|[^\"])*[\"]ß
letra               [a-zA-ZÑñ]+
id                  ({letra}|('_'{letra})|({letra}'_'))({letra}|{int}|'_')*


%%
//definir tokens
\s+                                         /* skip whitespace */

//COMENTARIOS
"//".*	                                    // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas
//PALABRAS RESERVADAS

//ESTRUCTURAS DE DATOS
"new"                   return 'new'
"DynamicList"           return 'lista_dinamica'
"append"                return 'append'
"getValue"              return 'getValue'
"setValue"              return 'setValue'

//SENTENCIAS
"if"                    return 'if'
"else"                  return 'else'
"switch"                return 'switch'
"case"                  return 'case'
"default"               return 'default'
"while"                 return 'while'
"for"                   return 'for'
"do"                    return 'do'
"break"                 return 'break'
"continue"              return 'continue'
"return"                return 'return'

//FUNCIONES
"void"                  return 'void'
"start"                 return 'start'
"with"                  return 'with'
"WriteLine"             return 'WriteLine' 
"toLower"               return 'toLower'
"toUpper"               return 'toUpper'
"length"                return 'length'
"truncate"              return 'truncate'
"round"                 return 'round' 
"typeof"                return 'typeof'
"tostring"              return 'tostring'
"toCharArray"           return 'toCharArray'

//TIPOS DE DATO
"string"                return 't_string'
"char"                  return 't_char'
"int"                   return 't_int'
"boolean"               return 't_boolean'
"double"                return 't_double' 



//OPERADORES ARITMETICOS
"++"                    return '++'
"--"                    return '--'
"+"                     return '+'
"-"                     return '-'
"*"                     return '*'
"/"                     return '/'
"ˆ"                     return 'ˆ'
"%"                     return '%'


//OPERADORES RELACIONALES
"<="                    return '<='
">="                    return '>='
"=="                    return '=='
"!="                    return '!='
"<"                     return '<'
">"                     return '>'

//ASIGNACION
"="                     return '='


//OPERADORES LOGICOS
"||"                    return '||'
"&&"                    return '&&'
"!"                     return '!'



//SIGNOS DE PUNTUACION
":"                     return ':'
"?"                     return '?'
";"                     return ';'
","                     return ','


//SIGNO IGUAL
"="                     return '='

//SIGNOS DE AGRUPACION
"("                     return '('
")"                     return ')' 
"{"                     return '{'
"}"                     return '}'
"["                     return '['
"]"                     return ']'

     

//VALORES-TIPO DE DATO
{char}                  return 'char'
{double}                return 'double'
{int}                   return 'int'
{boolean}               return 'boolean'
{string}                return 'string'
{id}                    return 'id'

<<EOF>>		            return 'EOF'

//MANEJO DE ERRORES LEXICOS
.               {errores.push(new MiError(yylloc.first_line, yylloc.first_column ,TypeError.LEXICO ,"ERROR LEXICO EN"+yytext));}

/lex

//DEFINIR PRECEDENCIA DE LOS OPERADORES

%nonassoc       '(' , ')'
%right          '-'
%nonassoc       'ˆ'
%left           '/','*'
%left           '+','-'
%left           '?'
%left           ':'
%left           '==','!=','<','<=','>','>='
%right          '!'
%left           '&&'
%left           '||'
%left           '%'
%right          '++','--'






//DEFINIR NO TERMINAL DE INICIO
%start INICIO

%%

//producciones
//NODO INICIAL
INICIO
    :ENTORNO_GLOBAL EOF {
        try{
            console.log('ANALISIS EXITOSO');
            return $1;
        }catch(e){
            console.log("EXISTE UNO O VARIOS ERRORES");
        }
        
    }
    ;

//LISTA DE INSTRUCCIONES EN EL ENTORNO GLOBAL QUE EJECUTARA EL PROGRAMA
ENTORNO_GLOBAL
    :ENTORNO_GLOBAL GLOBAL {
        $1.push($2);
        $$ = $1;
    }
    |GLOBAL{
        $$ = [$1];
    }
    |error { 
        let er = new MiError(@1.first_line, @1.first_column, TypeError.SINTACTICO, "ERROR SINTACTICO EN: "+ yytext);
        errores.push(er);    
    }
    ;

//INSTRUCCIONES GLOBALES
GLOBAL    
    :DECLARACION_VARIABLE{
        //console.log($1);
        $$=$1;
    }
    |DECLARACION_FUNCIONES{
        //console.log($1);
        $$=$1;
    }
    |INICIAR_SISTEMA{
        //console.log($1);
        $$=$1
    }
    ;

//DECLARAR EL INICIO DEL SISTEMA
INICIAR_SISTEMA
    :'start' 'with' 'id' '(' ')' ';'{
        $$ = new Call($3, [], TypeCall.START, @1.first_line, @1.first_column);
    }
    |'start' 'with' 'id' '(' LISTA_VALORES ')' ';'{
        $$ = new Call($3, $5, TypeCall.START, @1.first_line, @1.first_column);
    }
    ;

//LISTA DE VALORES PARA INGRESAR LOS PARAMETROS DE FUNCIONES Y METODOS PARA INICIAR EL SISTEMA
LISTA_VALORES
    :LISTA_VALORES ',' EXPRESION{
        $1.push($3);
        $$ = $1;
    }
    |EXPRESION{
        $$ = [$1];
    }
    ;


//DECLARACION DE FUNCIONES O METODOS
DECLARACION_FUNCIONES
    :TIPO_DATO 'id' '(' PARAMETROS_FUNCION ')' ENTORNO{
        if($1 == "int"){
            $$ = new Function($2, 0, $6, $4, @1.first_line, @1.first_column);
        }else if($1 == "double"){
            $$ = new Function($2, 1, $6, $4, @1.first_line, @1.first_column);
        }else if($1 == "boolean"){
            $$ = new Function($2, 2, $6, $4, @1.first_line, @1.first_column);
        }else if($1 == "char"){
            $$ = new Function($2, 3, $6, $4, @1.first_line, @1.first_column);
        }else if($1 == "string"){
            $$ = new Function($2, 4, $6, $4, @1.first_line, @1.first_column);
        }else if($1 == "void"){
            $$ = new Function($2, 5, $6, $4, @1.first_line, @1.first_column);
        }    
        
    }
    |TIPO_DATO 'id' '(' ')' ENTORNO{   
        if($1 == "int"){
            $$ = new Function($2, 0, $5, [], @1.first_line, @1.first_column);
        }else if($1 == "double"){
            $$ = new Function($2, 1, $5, [], @1.first_line, @1.first_column);
        }else if($1 == "boolean"){
            $$ = new Function($2, 2, $5, [], @1.first_line, @1.first_column);
        }else if($1 == "char"){
            $$ = new Function($2, 3, $5, [], @1.first_line, @1.first_column);
        }else if($1 == "string"){
            $$ = new Function($2, 4, $5, [], @1.first_line, @1.first_column);
        }else if($1 == "void"){
            $$ = new Function($2, 5, $5, [], @1.first_line, @1.first_column);
        }    
    }
    ;



//PARAMETROS PARA UNA FUNCION O METODO
PARAMETROS_FUNCION
    : PARAMETROS_FUNCION ',' TIPO_DATO 'id'{
        if($3 == "int"){
            const parametro = new Params($4, 0, @1.first_line, @1.first_column);
            $1.push(parametro);
            $$ = $1;
        }else if($3 == "double"){
            const parametro = new Params($4, 1, @1.first_line, @1.first_column);
            $1.push(parametro);
            $$ = $1;
        }else if($3 == "boolean"){
            const parametro = new Params($4, 2, @1.first_line, @1.first_column);
            $1.push(parametro);
            $$ = $1;
        }else if($3 == "char"){
            const parametro = new Params($4, 3, @1.first_line, @1.first_column);
            $1.push(parametro);
            $$ = $1;
        }else if($3 == "string"){
            const parametro = new Params($4, 4, @1.first_line, @1.first_column);
            $$ = [parametro];
        }

    }
    |TIPO_DATO 'id'{
        if($1 == "int"){
            const parametro = new Params($2, 0, @1.first_line, @1.first_column);
            $$ = [parametro];
        }else if($1 == "double"){
            const parametro = new Params($2, 1, @1.first_line, @1.first_column);
            $$ = [parametro];
        }else if($1 == "boolean"){
            const parametro = new Params($2, 2, @1.first_line, @1.first_column);
            $$ = [parametro];
        }else if($1 == "char"){
            const parametro = new Params($2, 3, @1.first_line, @1.first_column);
            $$ = [parametro];
        }else if($1 == "string"){
            const parametro = new Params($2, 4, @1.first_line, @1.first_column);
            $$ = [parametro];
        }
    }
    ;


//LISTA DE INSTRUCCIONES
INSTRUCCIONES
    :INSTRUCCIONES INSTRUCCION{
        $1.push($2);
        $$ = $1;
    }
    |INSTRUCCION{
        $$ = [$1];
    }
    ;

//INSTRUCCIONES QUE INGRESARAN EN UNA LISTA
INSTRUCCION
    :DECLARACION_VARIABLE{
        //console.log($1);
        $$ = $1;
    }
    |ASIGNACION ';'{
        //console.log($1);
        $$ = $1;
    }
    |METODOS_CALL ';'{
        //console.log($1);
        $$ = $1;
    }
    |SENTENCIAS{
        //console.log($1);
        $$ = $1;
    }
    |TRANSFERENCIA ';'{
        //console.log($1);
        $$ = $1;
    }
    ;

//SENTENCIAS DE TRANSFERENCIA
TRANSFERENCIA   
    :'break'{
        $$ = new Break(@1.first_line, @1.first_column);
    }
    |'return' EXPRESION{
        $$ = new Return($2, @1.first_line, @1.first_column);
    } 
    |'return' {
        $$ = new Return(null, @1.first_line, @1.first_column);
    }
    |'continue'{
        $$ = new Continue(@1.first_line, @1.first_column);
    }
    ;

//SENTENCIAS (CICLOS Y CONDICIONES) A UTILIZAR EN EL LENGUAJE
SENTENCIAS
    :GENERARIF{
        $$ = $1;
    }
    |GENERARSWITCH{
        $$ = $1;
    }
    |GENERARWHILE{
        $$ = $1;
    }
    |GENERARFOR{
        $$ = $1;
    }
    |GENERARDOWHILE{
        $$ = $1;
    }
    ;
   
//SENTENCIA PARA EL CICLO IF Y TODAS SUS VARIANTES
GENERARIF
    :'if' '(' EXPRESION ')' ENTORNO GENERARELSE{
        $$ = new If($3, $5, $6, @1.first_line, @1.first_column);
    }
    ;

//SENTENCIA PARA ELSE
GENERARELSE
    :'else' ENTORNO{
        $$ = $2;
    }
    |'else' GENERARIF{
        $$ = $2;
    } 
    |/*epsilon*/{
        $$ = null;
    }
    ;

//SENTENCIA PARA SWITCH
GENERARSWITCH
    :'switch' '(' EXPRESION ')' ENTORNO_SWITCH{
        $$ = new Switch($3, $5, @1.first_line, @1.first_column);
    }
    ;

//LISTA DE CASOS DEL SWITCH
CASES_LIST
    :CASES_LIST 'case' EXPRESION ':' INSTRUCCIONES{
        let code = new Statement($5, @1.first_line, @1.first_column);
        let case1 =  new Case($3, code, @1.first_line, @1.first_column);
        $1.push(case1);
        $$ = $1;
    }
    |'case' EXPRESION ':' INSTRUCCIONES{
        let code2 = new Statement($4, @1.first_line, @1.first_column);
        let case2 =  new Case($2, code2, @1.first_line, @1.first_column);
        $$ = [case2];
    }
    ;

//DEFAULT PARA EL SWITCH
DEFAULT
    :'default' ':' INSTRUCCIONES{
        let code3  = new Statement($3, @1.first_line, @1.first_column);
        let case3 =  new Case(null, code3, @1.first_line, @1.first_column);
        $$ = case3;
    }
    ;

//SENTENCIA PARA WHILE
GENERARWHILE
    :'while' '(' EXPRESION ')' ENTORNO{
        $$ = new While($3, $5, @1.first_line, @1.first_column);
    }
    ;

//SENTENCIA PARA FOR
GENERARFOR
    :'for' '(' DECLARACION_VARIABLE EXPRESION ';' ASIGNACION ')' ENTORNO{
        $$ = new For($3, $4, $6, $8, @1.first_line, @1.first_column);
    }
    |'for' '(' ASIGNACION ';' EXPRESION ';' ASIGNACION ')' ENTORNO{
        $$ = new For($3, $5, $7, $9, @1.first_line, @1.first_column);
    }
    ;

//SENTENCIA PARA DO WHILE
GENERARDOWHILE
    :'do' ENTORNO 'while' '(' EXPRESION ')' ';'{
        $$ = new DoWhile($5, $2, @1.first_line, @1.first_column);
    }
    ;

//ENTORNO PARA EL SWITCH
ENTORNO_SWITCH
    :'{' CASES_LIST DEFAULT '}'{
        $2.push($3);
        $$ = $2;
    }
    |'{' CASES_LIST '}'{
        $$ = $2;
    }
    |'{' DEFAULT '}'{
        $$ = [$2];  
    }
    ;

//ENTORNO PARA EL ENCAPSULAMIENTO DE INSTRUCCIONES EN DIFERENTES AMBITOS
ENTORNO
    :'{' '}'{
         $$ = new Statement([], @1.first_line, @1.first_column);
    }
    |'{' INSTRUCCIONES '}'{
         $$ = new Statement($2, @1.first_line, @1.first_column);
    }
    ;

//LLAMADA A LOS METODOS
METODOS_CALL
    :'append' '(' 'id' ',' EXPRESION ')'{
        $$ = new Call($3, [$5], TypeCall.APPEND, @1.first_line, @1.first_column);
    }
    |'setValue' '(' 'id' ',' LISTA_VALORES ')'{
        $$ = new Call($3, $5, TypeCall.SETVALUE, @1.first_line, @1.first_column);
    }
    |'WriteLine' '(' LISTA_VALORES ')'{
        $$ = new Call($1, $3, TypeCall.WRITELINE, @1.first_line, @1.first_column);
    }
    |'id' '(' LISTA_VALORES ')'{
        $$ = new Call($1, $3, TypeCall.DECLARED, @1.first_line, @1.first_column);
    }
    |'id' '(' ')'{
        $$ = new Call($1, [], TypeCall.DECLARED, @1.first_line, @1.first_column);
    } 
    ;

//LLAMADA DE FUNCIONES
FUNCIONES_CALL   
    :'getValue' '(' 'id' ',' LISTA_VALORES ')'{
        $$ = new CallExp($3, $5, TypeCallExp.GETVALUE, @1.first_line, @1.first_column);
    }
    |'toLower' '(' LISTA_VALORES ')'{
        $$ = new CallExp($1, $3, TypeCallExp.TOLOWER, @1.first_line, @1.first_column);
    }
    |'toUpper' '(' LISTA_VALORES ')'{
        $$ = new CallExp($1, $3, TypeCallExp.TOUPPER, @1.first_line, @1.first_column);
    }
    |'length' '(' LISTA_VALORES ')'{
        $$ = new CallExp($1, $3, TypeCallExp.LENGTH, @1.first_line, @1.first_column);
    }
    |'truncate' '(' LISTA_VALORES ')'{
        $$ = new CallExp($1, $3, TypeCallExp.TRUNCATE, @1.first_line, @1.first_column);
    }
    |'round' '(' LISTA_VALORES ')'{
        $$ = new CallExp($1, $3, TypeCallExp.ROUND, @1.first_line, @1.first_column);
    }
    |'typeof' '(' LISTA_VALORES ')'{
        $$ = new CallExp($1, $3, TypeCallExp.TYPEOF, @1.first_line, @1.first_column);
    }
    |'tostring' '(' LISTA_VALORES ')'{
        $$ = new CallExp($1, $3, TypeCallExp.TOSTRING, @1.first_line, @1.first_column);
    }
    |'toCharArray' '(' LISTA_VALORES ')'{
        $$ = new CallExp($1, $3, TypeCallExp.TOCHARARRAY, @1.first_line, @1.first_column);
    }
    |'id' '(' LISTA_VALORES ')'{
        $$ = new CallExp($1, $3, TypeCallExp.DECLARED, @1.first_line, @1.first_column);
    }
    |'id' '(' ')'{
        $$ = new CallExp($1, [], TypeCallExp.DECLARED, @1.first_line, @1.first_column);
    } 
    ;



//DECLARACION DE VARIABLE
DECLARACION_VARIABLE
    :TIPO_DATO ASIGNACION ';'{
        if($1 == "int"){
            $$ = new Declaration( 0, $2, @1.first_line, @1.first_column);
        }else if($1 == "double"){
            $$ = new Declaration( 1, $2, @1.first_line, @1.first_column);
        }else if($1 == "boolean"){
            $$ = new Declaration( 2, $2, @1.first_line, @1.first_column);
        }else if($1 == "char"){
            $$ = new Declaration( 3, $2, @1.first_line, @1.first_column);
        }else if($1 == "string"){
            $$ = new Declaration( 4, $2, @1.first_line, @1.first_column);
        }    
    }
    |TIPO_DATO LISTA_ID';'{
        if($1 == "int"){
            $$ = new Declaration( 0, $2, @1.first_line, @1.first_column);
        }else if($1 == "double"){
            $$ = new Declaration( 1, $2, @1.first_line, @1.first_column);
        }else if($1 == "boolean"){
            $$ = new Declaration( 2, $2, @1.first_line, @1.first_column);
        }else if($1 == "char"){
            $$ = new Declaration( 3, $2, @1.first_line, @1.first_column);
        }else if($1 == "string"){
            $$ = new Declaration( 4, $2, @1.first_line, @1.first_column);
        }    
    }
    |'lista_dinamica' '<' TIPO_DATO '>' ASIGNACION ';'{
         if($3 == "int"){
            $$ = new Declaration( 0, $5, @1.first_line, @1.first_column);
        }else if($3 == "double"){
            $$ = new Declaration( 1, $5, @1.first_line, @1.first_column);
        }else if($3 == "boolean"){
            $$ = new Declaration( 2, $5, @1.first_line, @1.first_column);
        }else if($3 == "char"){
            $$ = new Declaration( 3, $5, @1.first_line, @1.first_column);
        }else if($3 == "string"){
            $$ = new Declaration( 4, $5, @1.first_line, @1.first_column);
        }    
    }
     |'lista_dinamica' '<' TIPO_DATO '>' LISTA_ID ';'{
         if($3 == "int"){
            $$ = new Declaration( 0, $5, @1.first_line, @1.first_column);
        }else if($3 == "double"){
            $$ = new Declaration( 1, $5, @1.first_line, @1.first_column);
        }else if($3 == "boolean"){
            $$ = new Declaration( 2, $5, @1.first_line, @1.first_column);
        }else if($3 == "char"){
            $$ = new Declaration( 3, $5, @1.first_line, @1.first_column);
        }else if($3 == "string"){
            $$ = new Declaration( 4, $5, @1.first_line, @1.first_column);
        }    
    }
    ;



//ASIGNACION DE VARIABLES
ASIGNACION
    :LISTA_ID '=' EXPRESION{
        $$ = new Assigment($1,$3, @1.first_line, @1.first_column);
        //console.log($3);

    }
    |LISTA_ID '[' ']' '=' EXPRESION{
        $$ = new Assigment($1,$5, @1.first_line, @1.first_column);
        //console.log($5);
    }
    |LISTA_ID '[' EXPRESION ']' '=' EXPRESION{
        $$ = new AccessArrayAssigment($1, $3, $6, @1.first_line, @1.first_column);
        //console.log($6);
    }
    |'id' '++'{
        $$ = new ArithmeticAccessI($1, @1.first_line, @1.first_column);
    }
    |'id' '--'{
        $$ = new ArithmeticAccessI2($1, @1.first_line, @1.first_column);
    }
    ;

//LISTA DE ID
LISTA_ID
    :LISTA_ID ',' 'id'{
        $1.push($3);
        $$ = $1;
    }
    |'id'{
        $$ = [$1];
    }
    ;

//TIPOS DE DATO
TIPO_DATO
    :'t_double'{
        $$ = $1.toLowerCase();
    }
    |'t_char'{
        $$ = $1.toLowerCase();
    }
    |'t_int'{
        $$ = $1.toLowerCase();
    }
    |'t_string'{
        $$ = $1.toLowerCase();
    }
    |'t_boolean'{
        $$ = $1.toLowerCase();
    }
    |'void'{
        $$ = $1.toLowerCase();
    }
    ;

//EXPRESIONES
EXPRESION
    :EXPMAT{
        $$ = $1;
    }
    |EXPLOG{
        $$ = $1;
    }
    |EXPREL{
        $$ = $1;
    }
    |EXPTER{
        $$ = $1;
    }
    |FUNCIONES_CALL{
        $$ = $1;
    }
    |'(' TIPO_DATO ')' EXPRESION{
        if($2 == "int"){
            $$ = new Casting(0, $4, @1.first_line, @1.first_column);
        }else if($2 == "double"){
            $$ = new Casting(1, $4, @1.first_line, @1.first_column);
        }else if($2 == "char"){
            $$ = new Casting(3, $4, @1.first_line, @1.first_column);
        }else{
            $$ = new Casting(5, $4, @1.first_line, @1.first_column);
        }
    }
    |'(' EXPRESION ')'{
        $$ = $2
    }
    |'new' 'lista_dinamica' '<' TIPO_DATO '>'{
         if($4 == "int"){
            $$ = new NewList(0, @1.first_line, @1.first_column);
        }else if($4 == "double"){
            $$ = new NewList(1, @1.first_line, @1.first_column);
        }else if($4 == "boolean"){
            $$ = new NewList(2, @1.first_line, @1.first_column);
        }else if($4 == "char"){
            $$ = new NewList(3, @1.first_line, @1.first_column);
        }else if($4 == "string"){
            $$ = new NewList(4, @1.first_line, @1.first_column);
        }    
    }
    |ARRAY{
        $$ = $1;
    }
    |VALORES{
        $$ = $1;
    }
    |'id'{
        $$ = new Access($1, @1.first_line, @1.first_column);
    }
    |'id' '++'{
        $$ = new ArithmeticAccess($1, @1.first_line, @1.first_column);
    }
    |'id' '--'{
        $$ = new ArithmeticAccess2($1, @1.first_line, @1.first_column);
    }
    ;

//EXPRESIONES PARA DAR EL VALOR DEL ARRAY
ARRAY
    :'{' VALORES_LIST '}'{
        $$ = new NewArray($2, @1.first_line, @1.first_column);    
    }
    |'new' TIPO_DATO '[' EXPRESION ']'{
        if($2 == "int"){
            $$ = new NewCleanArray($4, 0, @1.first_line, @1.first_column);
        }else if($2 == "double"){
            $$ = new NewCleanArray($4, 1, @1.first_line, @1.first_column);
        }else if($2 == "boolean"){
            $$ = new NewCleanArray($4, 2, @1.first_line, @1.first_column);
        }else if($2 == "char"){
            $$ = new NewCleanArray($4, 3, @1.first_line, @1.first_column);
        }else if($2 == "string"){
            $$ = new NewCleanArray($4, 4, @1.first_line, @1.first_column);
        }
    }
    |'id' '[' EXPRESION ']'{
        $$ = new AccesArray($1, $3, @1.first_line, @1.first_column);
    }
    ;

//EXPRESIONES ARITMETICAS
EXPMAT
    :EXPRESION '+' EXPRESION{
        $$ = new Arithmetic($1, $3, ArithmeticOption.SUMA, @1.first_line, @1.first_column);
    }
    |EXPRESION '-' EXPRESION{
        $$ = new Arithmetic($1, $3, ArithmeticOption.RESTA, @1.first_line, @1.first_column);
    }
    |EXPRESION '/' EXPRESION{
        $$ = new Arithmetic($1, $3, ArithmeticOption.DIVISION, @1.first_line, @1.first_column);
    }
    |EXPRESION '*' EXPRESION{
        $$ = new Arithmetic($1, $3, ArithmeticOption.MULTIPLICACION, @1.first_line, @1.first_column);
    }
    |EXPRESION 'ˆ' EXPRESION{
        $$ = new Arithmetic($1, $3, ArithmeticOption.POTENCIA, @1.first_line, @1.first_column);
    }
    |EXPRESION '%' EXPRESION{
        $$ = new Arithmetic($1, $3, ArithmeticOption.MODULO, @1.first_line, @1.first_column);
    }
    |'-' EXPRESION{
        $$ = new Arithmetic(new Literal(0, @1.first_line, @1.first_column, 0), $2, ArithmeticOption.UNARIO, @1.first_line, @1.first_column);
    }
    ;

//EXPRESIONES LOGICAS
EXPLOG
    :EXPRESION '&&' EXPRESION{
        $$ = new Logic($1, $3, LogicOption.AND, @1.first_line, @1.first_column);
    }
    |EXPRESION '||' EXPRESION{
        $$ = new Logic($1, $3, LogicOption.OR, @1.first_line, @1.first_column);
    }
    |'!' EXPRESION{
        $$ = new Logic($2, null, LogicOption.NOT, @1.first_line, @1.first_column);
    }
    ;

//EXPRESIONES RELACIONALES
EXPREL
    :EXPRESION '==' EXPRESION{
        $$ = new Relational($1, $3, RelationalOption.IGUAL_IGUAL, @1.first_line, @1.first_column);
    }
    |EXPRESION '!=' EXPRESION{
        $$ = new Relational($1, $3, RelationalOption.DIFERENCIA, @1.first_line, @1.first_column);
    }
    |EXPRESION '<' EXPRESION{
        $$ = new Relational($1, $3, RelationalOption.MENOR, @1.first_line, @1.first_column);
    }
    |EXPRESION '<=' EXPRESION{
        $$ = new Relational($1, $3, RelationalOption.MENOR_IGUAL, @1.first_line, @1.first_column);
    }
    |EXPRESION '>' EXPRESION{
        $$ = new Relational($1, $3, RelationalOption.MAYOR, @1.first_line, @1.first_column);
    }
    |EXPRESION '>=' EXPRESION{
        $$ = new Relational($1, $3, RelationalOption.MAYOR_IGUAL, @1.first_line, @1.first_column);
    }
    ;

//EXPRESION PARA OPERADOR TERNARIO
EXPTER  
    :EXPRESION '?' EXPRESION ':' EXPRESION{
        $$ = new Ternary($1, $3, $5, @1.first_line, @1.first_column);
    }
    ;



//LISTA DE LITERALES
VALORES_LIST
    :VALORES_LIST ',' VALORES{
        $1.push($3);
        $$ = $1;
    }
    |VALORES{
        $$ = [$1];
    }
    ;

//LITERALES
VALORES
    :'int'{
        $$ = new Literal($1, @1.first_line, @1.first_column, 0);
    }
    |'double'{
        $$ = new Literal($1, @1.first_line, @1.first_column, 1);
    }
    |'boolean'{
        $$ = new Literal($1, @1.first_line, @1.first_column, 2);
    }
    |'char'{
        $$ = new Literal($1.replace(/\'/g,""), @1.first_line, @1.first_column, 3);
    }
    |'string'{
        $$ = new Literal($1.replace(/\"/g,""), @1.first_line, @1.first_column, 4);
    }
    ;

