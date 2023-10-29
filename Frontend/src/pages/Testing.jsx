import { useState } from "react"

export function Testing(){

    const [categories2,setReset]=useState({index:0,isChosen:false})

    const categories=['1','2','3']

    const subCategories=[
        {1:['bread','crumbs']},
        {2:['spider','man']},
        {3:['toasty','toast']}]

    const subIndex=categories.findIndex((cat)=>cat==='3')

    function change(selection){
        const index=categories.findIndex((cat)=>cat===selection.target.value)
        setReset({index:index,isChosen:true})
    }
    
    function change2(selection){
        console.log(selection.target.value)
    }

    const miniCat=(Object.values(subCategories[categories2.index]))

    return (<section>
             testing page

              {!categories2.isChosen && 
              <select id='options' onChange={change}>
                <option value=''>option</option>
                {categories.map((cat => <option value={cat} key={cat}>{cat}</option>))}
              </select>
              }

              {categories2.isChosen && 
              <select id='minOptions' onChange={change2}>
                <option value=''>none</option>
                 {miniCat[0].map((cat => 
                 <option value={cat} key={cat}>{cat}</option>))}
              </select>
              }

            </section>)
}