//CODIGO JS
%{
    const { Literal } = require('../modelos/Expresiones/Literal');
    const { Arithmetic, ArithmeticOption } = require('../modelos/Expresiones/Arithmetic');
    const { Relational, RelationalOption } = require('../modelos/Expresiones/Relational');
    const { Logic, LogicOption } = require('../modelos/Expresiones/Logic');
    const { Ternary } = require('../modelos/Expresiones/Ternary');
    const { AccesArray } = require('../modelos/Expresiones/AccesArray');
    const { NewArray } = require('../modelos/Expresiones/NewArray');
    const { Array } = require('../modelos/Symbol/Array');
    const { Access } = require('../modelos/Expresiones/Access');
    const { Params } = require('../modelos/Expresiones/Params');
    //const { CallExp } = require('../modelos/Expresiones/CallExp');
    //const { Call } = require('../modelos/Instrucciones/Call');
    const { Function } = require('../modelos/Instrucciones/Function');
    const { Statement } = require('../modelos/Instrucciones/Statement');
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
"<"                     return '<'
">"                     return '>'
"<="                    return '<='
">="                    return '>='
"=="                    return '=='
"!="                    return '!='

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

/lex

//DEFINIR PRECEDENCIA DE LOS OPERADORES
%right          '(' 
%left           ')'
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
%nonassoc       '++','--'






//DEFINIR NO TERMINAL DE INICIO
%start INICIO

%%

//producciones
//NODO INICIAL
INICIO
    :ENTORNO_GLOBAL EOF {
        console.log('ANALISIS EXITOSO');
        return $1;
    }
    ;

//LISTA DE INSTRUCCIONES EN EL ENTORNO GLOBAL QUE EJECUTARA EL PROGRAMA
ENTORNO_GLOBAL
    :ENTORNO_GLOBAL GLOBAL {
        $1.push($2);
        $$ = $1;
    }
    |GLOBAL{
        $1=[$1];
        $$ = $1;
    }
    ;

//INSTRUCCIONES GLOBALES
GLOBAL    
    :DECLARACION_VARIABLE{
        $$=$1;
    }
    |DECLARACION_FUNCIONES{
        console.log($1);
        $$=$1;
    }
    |INICIAR_SISTEMA{
        $$=$1
    }
    ;

//DECLARAR EL INICIO DEL SISTEMA
INICIAR_SISTEMA
    :'start' 'with' 'id' '(' ')' ';'
    |'start' 'with' 'id' '(' LISTA_VALORES ')' ';'
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
        $$ = $1;
    }
    |ASIGNACION ';'{
        $$ = $1;
    }
    |FUNCIONES_CALL ';'{
        $$ = $1;
    }
    |SENTENCIAS{
        $$ = $1;
    }
    |TRANSFERENCIA ';'{
        $$ = $1;
    }
    ;

//SENTENCIAS DE TRANSFERENCIA
TRANSFERENCIA   
    :'break' 
    |'return' EXPRESION 
    |'return' 
    |'continue' 
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
    :'if' '(' EXPRESION ')' ENTORNO
    |'if' '(' EXPRESION ')' ENTORNO GENERARELSE
    |'if' '(' EXPRESION ')' ENTORNO GENERARELSEIF
    ;

//SENTENCIA PARA ELSE
GENERARELSE
    :'else' ENTORNO
    ;

//SENTENCIA PARA ELSE IF
GENERARELSEIF
    :'else' GENERARIF 
    ;

//SENTENCIA PARA SWITCH
GENERARSWITCH
    :'switch' '(' EXPRESION ')' ENTORNO
    ;

//LISTA DE CASOS DEL SWITCH
CASES_LIST
    :CASES_LIST 'case' EXPRESION ':' INSTRUCCIONES{
        $1.push($5);
        $$ = $1;
    }
    |'case' EXPRESION ':' INSTRUCCIONES{
        $$ = [$4];
    }
    ;

//DEFAULT PARA EL SWITCH
DEFAULT
    :'default' ':' INSTRUCCIONES{
        $$ = $3;
    }
    ;

//SENTENCIA PARA WHILE
GENERARWHILE
    :'while' '(' EXPRESION ')' ENTORNO
    ;

//SENTENCIA PARA FOR
GENERARFOR
    :'for' '(' DECLARACION_VARIABLE EXPRESION ';' ASIGNACION ')' ENTORNO
    |'for' '(' ASIGNACION ';' EXPRESION ';' ASIGNACION ')' ENTORNO
    ;

//SENTENCIA PARA DO WHILE
GENERARDOWHILE
    :'do' ENTORNO 'while' '(' EXPRESION ')' ';'
    ;

//ENTORNO PARA EL ENCAPSULAMIENTO DE INSTRUCCIONES EN DIFERENTES AMBITOS
ENTORNO
    :'{' '}'{
         $$ = new Statement(new Array(), @1.first_line, @1.first_column);
    }
    |'{' INSTRUCCIONES '}'{
         $$ = new Statement($2, @1.first_line, @1.first_column);
    }
    |'{' CASES_LIST DEFAULT '}'{
        const entlist = [];
        $2.forEach((bloque)=>{
            let env = new Statement(bloque, @1.first_line, @1.first_column);
            entlist.push(env);    
        });
        let env2 = new Statement($3, @1.first_line, @1.first_column);
        entlist.push(env2);
        console.log(entlist);
        $$ = entlist;
    }
    |'{' CASES_LIST '}'{
        const entlist2 = [];
        $2.forEach((bloque)=>{
            let env = new Statement(bloque, @1.first_line, @1.first_column);
            entlist2.push(env);    
        });
        console.log(entlist2);
        $$ = entlist2;
    }
    |'{' DEFAULT '}'{
        const entlist3 = [];
        let env3 = new Statement($2, @1.first_line, @1.first_column);
        entlist3.push(env3);
        console.log(entlist3)
        $$ = entlist3;
    }
    ;

//LLAMADA DE FUNCIONES
FUNCIONES_CALL   
    :'append' '(' LISTA_VALORES ')'
    |'setValue' '(' LISTA_VALORES ')'
    |'WriteLine' '(' LISTA_VALORES ')'
    |'getValue' '(' LISTA_VALORES ')'
    |'toLower' '(' LISTA_VALORES ')' 
    |'toUpper' '(' LISTA_VALORES ')' 
    |'length' '(' LISTA_VALORES ')' 
    |'truncate' '(' LISTA_VALORES ')' 
    |'round' '(' LISTA_VALORES ')' 
    |'typeof' '(' LISTA_VALORES ')' 
    |'tostring' '(' LISTA_VALORES ')' 
    |'toCharArray' '(' LISTA_VALORES ')' 
    ;





//DECLARACION DE VARIABLE
DECLARACION_VARIABLE
    :TIPO_DATO ASIGNACION ';'
    |'lista_dinamica' '<' TIPO_DATO '>' ASIGNACION ';'
    ;



//ASIGNACION DE VARIABLES
ASIGNACION
    :LISTA_ID '=' EXPRESION
    |LISTA_ID '[' ']' '=' EXPRESION
    |LISTA_ID '[' EXPRESION ']' '=' EXPRESION
    |LISTA_ID '[' ']'
    |LISTA_ID
    |'id' '++'
    |'id' '--'
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
        $$ = $1;
    }
    |'t_char'{
        $$ = $1;
    }
    |'t_int'{
        $$ = $1;
    }
    |'t_string'{
        $$ = $1;
    }
    |'t_boolean'{
        $$ = $1;
    }
    |'void'{
        $$ = $1;
    }
    ;

//EXPRESIONES
EXPRESION
    :EXPMAT{
        console.log($1);
        $$ = $1;
    }
    |EXPLOG{
        console.log($1);
        $$ = $1;
    }
    |EXPREL{
        console.log($1);
        $$ = $1;
    }
    |EXPTER{
        console.log($1);
        $$ = $1;
    }
    |FUNCIONES_CALL
    |'(' TIPO_DATO ')' EXPRESION
    |'(' EXPRESION ')'{
        $$ = $2
    }
    |'new' 'lista_dinamica' '<' TIPO_DATO '>'
    |ARRAY{
        console.log($1);
        $$ = $1;
    }
    |VALORES{
        console.log($1);
        $$ = $1;
    }
    |'id'{
         $$ = new Access($1, @1.first_line, @1.first_column);
    }
    |'id' '(' LISTA_VALORES ')' 
    |'id' '(' ')'
    ;

//EXPRESIONES PARA DAR EL VALOR DEL ARRAY
ARRAY
    :'{' VALORES_LIST '}'{
        $$ = new NewArray($2, @1.first_line, @1.first_column);
    }
    |'new' TIPO_DATO '[' EXPRESION ']'
    |'id' '[' VALORES ']'{
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
        $$ = new Arithmetic($1, $3, ArithmeticOption.MULTIPLICACION, @1.first_line, @1.first_column);
    }
    |EXPRESION '*' EXPRESION{
        $$ = new Arithmetic($1, $3, ArithmeticOption.DIVISION, @1.first_line, @1.first_column);
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

