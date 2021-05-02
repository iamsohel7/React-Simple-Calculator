import React from 'react';
import './App.css';

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];   //Numbers in the calculator.
const ops = ['/', '*', '-', '+', '='];         //Operators.

class App extends React.Component{
  constructor(props){
    super(props);

     this.state={
        lastPressed: undefined,                   //The last pressed value.
        currentNumber: '0',                      //Current input.
        calc: undefined,                        //Calculated value after an action.
        operation: undefined                   //various Operators. 
     }

     this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick = (event)=>{

        const {currentNumber, calc, operation, lastPressed} = this.state;
        const {innerText} = event.target;            //Getting the inner value of the element.

        this.setState({
          lastPressed: innerText
        })

        if(!Number.isNaN(Number(innerText))){         //Checking if the value is a number or not.           
          if(currentNumber==='0'){                   
              this.setState({
                currentNumber: innerText 
              })
          }else if(ops.includes(lastPressed)){          //if the last pressed is an operator then 
              this.setState({                            //changing the state of current number.  
                currentNumber: innerText  
              })
            }else{
              this.setState({
              currentNumber: currentNumber+innerText
            })
          }

       return;
    } 

     switch(innerText){
        case 'AC': this.setState({
                      currentNumber: '0',
                      calc: undefined,  
                      operation: undefined       
                  })
                  break;

        case '.': if(!currentNumber.includes(".")){
                      this.setState({
                        currentNumber: currentNumber + '.'
                      })  
                  }
                  break;

        default: 
                   if(!operation){
                          this.setState({
                            operation: innerText,
                            calc: currentNumber,
                            currentNumber: ''
                          })
                    }else if(innerText === '='){

                            var evaluated = eval(`${calc} ${operation} ${currentNumber}`);  //Evaluating using
                                                                                            //eval function.
                                                                        
                            if(evaluated.toString().includes('.')){          //Checking if the evaluated
                                  let n = [];                                //value contains a decimal  
                                  n = evaluated.toString().split('');        //and then rounding the value
                                  n.splice((n.indexOf('.'))+4);              //to some decimal places.
                                  evaluated = parseFloat(n.join(''));
                                  this.setState({
                                    operation: undefined,
                                    calc: evaluated,
                                    currentNumber: evaluated
                                  })
                            }  
                        
                          this.setState({
                            operation: undefined,
                            calc: evaluated,
                            currentNumber: evaluated
                          })

                      }else if(ops.includes(lastPressed) && ops.includes(innerText)){     //if consecutive    
                                                                                         //operators              
                            if(innerText === '-'){                                      //are pressed
                                    let e = undefined;                                 //checking if the last   
                                    e = `${lastPressed} ${innerText}`;                // is a '-' or not
                                                                                     //if not then setting    
                                    console.log("hello");                           //the operation to current 
                                    this.setState({                                //operator. 
                                      operation: e,
                                      
                                      lastPressed: innerText 
                                      })
                              }else{
                                      this.setState({
                                          operation: innerText,
                                          lastPressed: innerText
                                      })
                                }    
                        } else{
                                    var evaluated= eval(`${calc} ${operation} ${currentNumber}`); 
                                    this.setState({
                                      operation: innerText,
                                      calc: evaluated,
                                      currentNumber: evaluated
                                    }) 
                          }  
       }  
   } 

  render(){
      return (
       <div id="outer-box">

         <div id="container">

                <div id="display">
                  <small>{this.state.calc} {this.state.operation}</small>
                    {this.state.currentNumber}
                  </div>

            <button className="big-h grey ac" onClick={this.handleClick}>AC</button>

            <div className="numsContainer">
                {
                  nums.map(nums=> <button className={`darkGrey ${nums==0 && 'big-h'}`} key={nums} onClick={this.handleClick}>
                  {nums}
                  </button>
                  )
                }
           
                <button className="grey" onClick={this.handleClick}>.</button>

             </div>

           <div className="opsContainer">

                {
                  ops.map(ops=> <button className="orange " key={ops} onClick={this.handleClick}>
                    {ops}
                  </button>)
                }

             </div>
           
           </div> 

        </div>
       )
   } 
}  

export default App;
