D3TreeParser
============

Parser that builds a D3 Tree graph from simple text format as such: 

    ROOT | Second Detail | Third Detail
    -NODE1 | Second Detail
    --NODE2 | | Third Detail
    -NODE3 | Second Detail
    --NODE4
    ---NODE5
    -NODE6

##TODO

Decouple extra info from the display