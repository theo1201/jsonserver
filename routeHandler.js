function routeHandler(db) {
        const rewriter = {};
        Object.keys(db).forEach(key => {        
            const routeKey = `/${key.replace(/_/g, '/')}`;        
            rewriter[routeKey] = `/${key}`;    
        });
        return rewriter;
    }
module.exports = routeHandler;