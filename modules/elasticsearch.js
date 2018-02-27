var elasticsearch = require('elasticsearch');
var elasticClient = new elasticsearch.Client({
	host: 'localhost:9200'
});

var indexName = "goods";

function getSuggestions(input) {
	return elasticClient.search({
			index: indexName,
			body: {
				query: {
					match: {
						name: input,
						operator: "and"
					}
				}
			}
		}) // .then(function (response) {
		// var hits = response.hits.hits;
		// console.log(response);
		//  });
}
exports.getSuggestions = getSuggestions;

function addDocument(document) {
	return elasticClient.index({
		index: indexName,
		type: "foods",
		id: document.goodsid,
		body: {
			name: document.goodsname,
			price: document.goodsprice,
			path: document.goodspath,
			num: document.goodsnum,
			shopname: document.shopname
		}
	});
}
exports.addDocument = addDocument;

//删除索引用的
function deleteIndex() {
	return elasticClient.delete({
		index: indexName
	});
}

function deleteDocument(id) {
	return elasticClient.delete({
		index: indexName,
		type: "foods",
		id: id
	});
}
exports.deleteDocument = deleteDocument;

function updateDocument(document) {
	return elasticClient.update({
		index: indexName,
		type: "foods",
		id: document.id,
		body: {
			doc: {
				name: document.name,
				price: document.price,
				num: document.num,
				path: document.path
			}
		}

	});
}
exports.updateDocument = updateDocument;