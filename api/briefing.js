export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).json({error:'POST only'});
 if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:'Vercel 환경변수 OPENAI_API_KEY를 설정하세요.'});
 try{const response=await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:'gpt-4o-mini',messages:[{role:'system',content:'당신은 공장 물류 운영 분석가입니다. 한국어로 짧고 실행 가능한 브리핑을 작성하세요.'},{role:'user',content:JSON.stringify(req.body)}],temperature:0.4})});const data=await response.json();if(!response.ok)return res.status(response.status).json({error:data.error?.message||'OpenAI API 오류'});return res.status(200).json({report:data.choices?.[0]?.message?.content||'응답을 생성하지 못했습니다.'});}catch(e){return res.status(500).json({error:e.message});}
}
