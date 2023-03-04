import React, { Children, ReactNode } from "react";

interface Props  {
    children? : ReactNode
}
interface State {
    hasError : boolean
}

export class ErrorBoundary extends React.Component<Props,State>{
    constructor(props:any){
        super(props)
        this.state = {hasError : false  }
    }
    // static getDerivedStateFromError(error) {
    //     // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    //     return { hasError: true };
    //   }
    
    static componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log("Error")
        return (
            <div>
                <h1>Something went wrong</h1>
            </div>
        )
    }


    render(): React.ReactNode {
        if(this.state.hasError){
                    return(
            <section>
                <h1>Something went wrong</h1>
            </section>
        )
        }else{
            return this.props.children
        }

    }
}

// class ErrorBoundary extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = { hasError: false };
//     }
  
//     static getDerivedStateFromError(error) {
//       // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
//       return { hasError: true };
//     }
  
//     componentDidCatch(error, errorInfo) {
//       // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
//       logErrorToMyService(error, errorInfo);
//     }
  
//     render() {
//       if (this.state.hasError) {
//         // Можно отрендерить запасной UI произвольного вида
//         return <h1>Что-то пошло не так.</h1>;
//       }
  
//       return this.props.children; 
//     }
//   
